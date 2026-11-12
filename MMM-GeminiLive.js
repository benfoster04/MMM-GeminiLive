import {
  GoogleGenAI,
  Modality,
} from "@google/genai"

Module.register("MMM-GeminiLive", {

  responseQueue: [],

  defaults: {
    apiKey: undefined,
    grounding: false,
    functions: [],
    mediaResolution: "low",
    voiceName: "Zephyr",
    maxContextSize: 104857,
    targetContextSize: 52428,
    instruction: "You're built into a mirror. It's made of a two-way mirror with a screen behind it. Act normal, be aware the user is looking at themselves when talking to you."
  },

  // Stylesheet
  getStyles() { return ["mmm-geminilive.css"] },

  connect: async () => {
    this.session = await this.ai.live.connect({
      model: "models/gemini-3.8-live",
      config: {
        responseModalities: [
          Modality.AUDIO,
        ],
        mediaResolution: this.config.mediaResolution,
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: this.config.voiceName,
            }
          }
        },
        contextWindowCompression: {
          triggerTokens: this.config.maxContextSize.toString(),
          slidingWindow: { targetTokens: this.config.targetContextSize.toString() },
        },
        tools: this.config.functions,
        systemInstruction: {
          parts: [{
            text: this.config.instruction
          }]
        }
      },
      callbacks: {
        onopen: function () {
          Log.log("Gemini onopen")
        },
        onmessage: function (message) {
          this.sendSocketNotification("GL_ONMESSAGE_RQ", message)
          this.responseQueue.push(message)
        },
        onerror: function (e) {
          Log.error(e.message)
        },
        onclose: function (e) {
          Log.log(e.reason)
        }
      }
    })

    this.session.sendClientContent({
      turns: [
        "Hi there!"
      ]
    })

    this.sendSocketNotification("GL_HANDLETURN")
  },

  // Entrypoint
  start: async () => {
    if (!this.config.apiKey) {
      Log.error("API Key not configured.")
      return
    }

    this.ai = new GoogleGenAI({
      apiKey: this.config.apiKey,
    })

    this.connect()
  },

  suspend() { this.session.close() },
  resume() { this.connect() },

  // eslint-disable-next-line no-unused-vars
  socketNotificationReceived: function (notification, _payload) {
    switch (notification) {
      case "GL_DUMP_RQ":
        this.responseQueue = []
    }
  },

  /**
   * Render the page we're on.
   */
  getDom() {
    const wrapper = document.createElement("div")
    wrapper.innerHTML = this.responseQueue.join(" ")
    return wrapper
  },

})
