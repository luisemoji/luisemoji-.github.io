function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const { h, Component, render, options } = preact; /** @jsx h */

options.debounceRendering = requestAnimationFrame || setTimeout;
// options.syncComponentUpdates = false;

function randomEmoji() {
    return String.fromCodePoint(127987 + Math.random() * 525 | 0);
}

class Demo extends Component {
    constructor(...args) {
        super(...args);
        _defineProperty(this, "count",
            0);
        _defineProperty(this, "state", {
            emoji: []
        });
        _defineProperty(this, "reduce",


            state => {
                let { emoji, left, top } = state;
                if (state.down) {
                    emoji.push({
                        id: ++this.count,
                        key: this.count,
                        value: randomEmoji(),
                        size: Math.floor(28 + Math.random() * 100),
                        left,
                        top,
                        dx: 0,
                        dy: -3 - Math.random() * 5
                    });

                }
                for (let i = emoji.length; i--;) {
                    emoji[i].top += emoji[i].dy += .3;
                    emoji[i].left += emoji[i].dx += Math.random() - .5;
                    if (emoji[i].top > window.innerHeight + 128) emoji.splice(i, 1);
                }
                return state;
            });
        _defineProperty(this, "mousedown",

            e => {
                e.preventDefault();
                this.mousemove(e);
                this.setState({ down: true });
            });
        _defineProperty(this, "mousemove",

            e => {
                let t = e.changedTouches && e.changedTouches[0] || e;
                this.setState({ left: t.pageX, top: t.pageY });
            });
        _defineProperty(this, "mouseup",

            () => {
                this.setState({ down: false });
            });
    }

    componentDidUpdate() {
        setTimeout(() => {
            this.reduce(this.state);
            this.setState({});
        });
    }

    renderEmoji(emoji) {
        return h(Emoji, emoji);
    }

    render({}, { emoji }) {
        return (
            h("demo", {
                    onMouseDown: this.mousedown,
                    onMouseMove: this.mousemove,
                    onMouseUp: this.mouseup,
                    onTouchStart: this.mousedown,
                    onTouchMove: this.mousemove,
                    onTouchEnd: this.mouseup
                },

                h("code", { key: "count" }, emoji.length),
                h("h1", { key: "title" }, "Anda, tócale aquí  \ud83d\ude0f"),
                emoji.map(this.renderEmoji)));


    }
}


class Emoji extends Component {
    shouldComponentUpdate(props) {
        return props.left !== this.props.left || props.top !== this.props.top;
    }

    render({ left, top, size, value }) {
        let tx = `transform: translate(${left}px,${top}px) translate(-50%,-50%) scale(${size / 128});`;
        return h("emoji", { style: tx }, value);
        // return <emoji style={{
        // 	transform: `translate(${left}px,${top}px) translate(-50%,-50%) scale(${size/128})`
        // }}>{value}</emoji>
    }
}


render(h(Demo, null), document.body);