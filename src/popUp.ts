import { Config, defaultConfig } from './config';

export default class PopUp {

    private config: Config;

    private $wrapper: JQuery;
    private $cover: JQuery;
    private $popUp: JQuery;
    private $closeButton: JQuery;

    public constructor(config: Config = defaultConfig)
    {
        this.config = config;

        $("body").append(this.buildWrapperHtml());

        this.$wrapper = $("#popup-wrapper");

        this.$cover = $("#popup-cover");

        this.$popUp = null;

        this.$closeButton = null;
    }

    public open(html: string): void
    {
        this.$wrapper.append(this.buildHtml());

        this.$popUp = this.$wrapper.find("#popup");

        this.$closeButton = this.$popUp.find(".close");

        this.$popUp.append(html);

        this.$wrapper.show();

        this.bindClose();
    }

    public close(): void
    {
        this.$wrapper.hide();

        this.removeBind();

        this.$popUp.remove();

        this.$popUp = null;

        this.$closeButton = null;
    }

    public isOpen(): boolean
    {
        return this.$popUp.is(":visible");
    }

    private bindClose(): void
    {

        this.$popUp.on("click", function (e) { e.stopPropagation(); return false; });

        this.$cover.on("click", this.close);

        if (this.$closeButton != null){
            this.$closeButton.on("click", this.close);
        }
    }

    private removeBind(): void
    {
        this.$popUp.unbind("click", false);

        this.$cover.unbind("click", false);

        if (this.$closeButton != null){
            this.$closeButton.unbind("click", false);
        }
    }

    private buildWrapperHtml(): string
    {
        return `
            <div id="popup-wrapper">
                <div id="popup-cover"></div>
            </div>
        `;

    }
    private buildHtml(closeButton: boolean = this.config.closeButton): string
    {
        return `
            <div id="popup">
                ${closeButton ? '<div class="close">CLOSE</div>' : ''}
            </div>
        `;
    }
}