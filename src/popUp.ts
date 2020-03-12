import { Config, defaultConfig } from './config';

export default class PopUp {
    public $body: JQuery<HTMLElement>;
    public $header: JQuery<HTMLElement>;

    private config: Config;

    private $wrapper: JQuery<HTMLElement>;
    private $cover: JQuery<HTMLElement>;
    private $popUp: JQuery<HTMLElement>;
    private $closeButton: JQuery<HTMLElement>;

    public constructor(config: Config = defaultConfig)
    {
        this.config = config;

        this.$popUp = null;
        this.$closeButton = null;
    }

    public open(body: string, header: string = ""): void
    {
        this.ensureSetup();

        this.$header.append(header);
        this.$body.html(body);
        this.$wrapper.show();

        this.bindClose();
    }

    public close(): void
    {
        this.$wrapper.hide();
        this.$popUp.remove();

        this.removeBind();

        this.$popUp = null;
        this.$closeButton = null;
    }

    public clean(): void
    {
        this.$wrapper.remove();
        this.$wrapper = null;
        this.$cover = null;
        this.$closeButton = null;
    }

    public isOpen(): boolean
    {
        return this.$popUp.is(":visible");
    }

    private ensureSetup(): void
    {
        if (null == this.$wrapper || !this.$wrapper.length) {
            let $existingWrapper = $("#popup-wrapper");

            if ($existingWrapper.length) {
                this.$wrapper = $existingWrapper;
            } else {
                $("body").append(this.buildWrapperHtml());
                this.$wrapper = $("#popup-wrapper");
            }

            this.$cover = this.$wrapper.find("#popup-cover");
        }

        if (null == this.$popUp || !this.$popUp.length) {
            let $existingPopup = this.$wrapper.find(".popup");

            if ($existingPopup.length) {
                this.$popUp = $existingPopup;
            } else {
                this.$wrapper.append(this.buildHtml());
                this.$popUp = this.$wrapper.find(".popup");
            }

            this.$closeButton = this.$popUp.find(".close");

            this.$body = this.$popUp.find(".body");
            this.$header = this.$popUp.find(".header");
        }
    }

    private removeBind(): void	
    {	
        this.$popUp.off("click");	
        this.$cover.off("click");	

        if (this.$closeButton != null){	
            this.$closeButton.off("click");	
        }	
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
                <div class="header ${this.config.centerHeader ? 'center' : ''}">${
                    this.config.closeButton ? '<div class="close clickable">&nbsp;&times;&nbsp;</div>' : ''
                }</div>
                <div class="body"></div>
            </div>
        `;
    }
}
