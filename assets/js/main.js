function promptFiller() {
    return {
        prompt: localStorage.getItem('prompt') || '',
        placeholders: [],
        values: {},
        finalText: '',

        init() {
            // Run extractPlaceholders() on initialization
            this.extractPlaceholders();
        },

        extractPlaceholders() {
            this.placeholders = [...new Set((this.prompt.match(/[\[{](.*?)[\]}]/g) || []).map(m => m.slice(1, -1)))];
            this.placeholders.forEach(p => this.values[p] = this.values[p] || '');
            this.updateFinalText();
        },

        updateFinalText() {
            this.finalText = this.prompt.replace(/[\[{](.*?)[\]}]/g, (match, p) => this.values[p] || match);
        },

        getLabel(placeholder) {
            return placeholder.replace(/_/g, ' ').replace(/\b\w/g, p => p.toUpperCase());
        },

        copyToClipboard() {
            navigator.clipboard.writeText(this.finalText).then(() => console.log('Copied!')).catch(console.error);
        },

        askChatGPT() {
            const gptUrl = `https://chat.openai.com/?q=${encodeURIComponent(
              this.finalText
            )}`;
            window.open(gptUrl, "_blank");
          },

        setPrompt(newPrompt) {
            this.prompt = newPrompt;
            this.extractPlaceholders();
            this.updateFinalText();
        },

        saveToLocalStorage() {
            localStorage.setItem('prompt', this.prompt);
        },
    };
}

function promptLoader() {
    return {
        prompts: [
            { text: 'Simulate a conversation between [character 1] and [character 2] discussing [topic].' },
            { text: 'Create a plan for a [type of event] for [number] people, including [specific requirement].' },
            { text: 'Design a [type of workout] plan for [fitness level] individuals aiming to [goal] in [timeframe].' },
            { text: 'Teach me [language] phrases related to [topic], with examples of usage.' },
            { text: 'Develop a [content type] strategy for a business in the [industry] targeting [audience]. Include an analysis of audience needs, content formats, distribution channels, frequency, and methods to measure engagement and success.' },
            { text: 'Describe a scenario where [problem] arises in [context]. Provide a step-by-step approach to identify the root cause, propose [number] solutions, and evaluate their effectiveness. Include any tools or frameworks that could assist in resolving the issue.' },
            { text: 'Perform a comparative analysis of [option 1] and [option 2] in the context of [specific use case]. Discuss their pros and cons, implementation requirements, costs, and suitability for [target audience]. Conclude with a recommendation and justification.' },
            { text: 'Write a detailed step-by-step guide for [task], intended for [experience level] users. Include prerequisites, tools required, detailed instructions, common mistakes to avoid, and tips for troubleshooting.' },
            { text: 'Provide personalized advice for [type of individual] looking to [goal]. Include steps they should take, potential challenges they may face, and resources they can use to succeed. Tailor the advice based on [specific context].' },
            { text: 'Create a curriculum for teaching [topic] to [target audience]. The curriculum should span [timeframe] and include learning objectives, daily or weekly lesson plans, recommended resources, practical exercises, and evaluation methods.' },
            { text: 'Recommend [number] [type of product/service] for someone interested in [interest/hobby].' },
            { text: 'Create a study plan for learning [topic] in [timeframe], including daily tasks and resources.' },
            { text: 'Write a [genre] story set in [time period] where the main character is a [profession] facing [challenge].' },
            { text: 'Suggest [number] solutions for [problem] considering [constraints].' }
        ]
    };
}