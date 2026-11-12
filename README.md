# MMM-GeminiLive
Yes, I used the template. No, I don't care.

## Installation

### Install

In your terminal, go to the modules directory and clone the repository:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/benfoster04/MMM-GeminiLive.git
```

### Update

Go to the module directory and pull the latest changes:

```bash
cd ~/MagicMirror/modules/MMM-GeminiLive
git pull
```

## Configuration

To use this module, you have to add a configuration object to the modules array in the `config/config.js` file.


### Configuration options

Option|Data Type|Default|Description
------|------|------|-----------
`apiKey`|`string`|n/a|Your Gemini API Key
`grounding`|`bool`|`false`|Ground responses with Google Search
`functions`|`array`|`[]`|Function calling - Define functions that Gemini can call. [Learn more](https://aistudio.google.com/docs/function-calling)
`mediaResolution`|`string`|`"low"`|Media resolution: `"low"`, `"medium"`... [Learn more](https://aistudio.google.com/docs/media-resolution)
`"voiceName"`|`string`|`"Zephyr"`|Pre-built voice model to use [Learn more](https://aistudio.google.com/docs/speech-generation#prebuilt-voices)
`"maxContextSize"`|`int`|`104857`|Maximum number of tokens accumulated before sliding the context window
`"targetContextSize"`|`int`|`52428`|Number of tokens kept in context after sliding the context window
`"instruction"`|`string`|n/a|Optional - A set of instructions passed to the model to define tone and style in its response.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.