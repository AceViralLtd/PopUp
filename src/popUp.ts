import { Config, defaultConfig } from './config';

export default class PopUp {

    private config: Config;

    private $wrapper: JQuery<HTMLElement>;
    private $cover: JQuery<HTMLElement>;
    private $popUp: JQuery<HTMLElement>;
    private $closeButton: JQuery<HTMLElement>;

    public constructor(config: Config = defaultConfig)
    {
        this.config = config;

        $("body").append(this.buildWrapperHtml());

        this.$wrapper = $("#popup-wrapper");
        this.$cover = $("#popup-cover");
        this.$popUp = null;
        this.$closeButton = null;
    }

    public open(body: string, header: string = ""): void
    {
        this.$wrapper.append(this.buildHtml());
        this.$popUp = this.$wrapper.find(".popup");
        this.$closeButton = this.$popUp.find(".close");

        this.$popUp.find(".header").append(header);
        this.$popUp.find(".body").html(body);

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
        if (this.config.backgroundCanClosePopup){
            this.$cover.on("click", this.close.bind(this));
        }

        if (this.$closeButton != null){
            this.$closeButton.on("click", this.close.bind(this));
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
                <div id="popup-cover" class="${this.config.backgroundCanClosePopup ? "clickable" : ""}"></div>
            </div>
        `;

    }
    private buildHtml(): string
    {
        return `
            <div class="popup">
                <div class="header ${this.config.centerHeader ? 'center' : ''}">
                    ${this.config.closeButton ? '<div class="close clickable">&nbsp;&times;&nbsp;</div>' : ''}
                </div>
                <div class="body"></div>
            </div>
        `;
    }
}
