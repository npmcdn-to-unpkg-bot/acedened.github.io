window.onload = function() {
    var vm = new Vue({
        el: '#app',
        data: {
            input: '',
            history: [],
            availableCommands: ['about', 'projects', 'links', 'help', 'clear'],
            lines: []
        },

        methods: {
            write: function(text, prompted) {
                this.lines.push({
                    text: text,
                    isPrompted: prompted
                })

                document.body.scrollTop = document.body.scrollHeight
            },

            execute: function(command) {
                if (this.availableCommands.indexOf(command) == -1) {
                    if (command.length > 0)
                        this.write("Unknown command: " + command)
                    return
                }

                this[command]()
            },

            about: function() {
                this.write('Vadim Novoseltsev (acedened)')
                this.write('Software developer')
                this.write('C# (UWP, WPF, WinForms), Clojure')
            },

            projects: function() {
                this.write('<a href="http://acedened.github.io/TheChan/">The Chan</a>')
                this.write('<a href="https://github.com/acedened/clojure-vk">clojure-vk</a>')
            },

            links: function() {
                this.write('<a href="https://github.com/acedened">GitHub</a>')
                this.write('<a href="mailto:acedened@outlook.com">Contact me</a>')
            },

            help: function() {
                this.write('Available commands: about, projects, links, help, clear')
            },

            clear: function() {
                this.lines = []
            },

            enter: function() {
                this.writeAndExecute(this.input)
                this.input = ""
            },

            writeAndExecute: function(command) {
                this.history.push(command)
                this.write(command, true)
                this.execute(command.trim())
            },

            previousCommand: function() {
                if (this.history.length > 0)
                    this.input = this.history.pop()
            }
        }
    })
    vm.writeAndExecute('help')
}
