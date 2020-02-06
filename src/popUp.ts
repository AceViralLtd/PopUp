import { Config, defaultConfig } from './config';

export default class PopUp {

    private config: Config;

    private $wrapper: JQuery;


    public constructor(config: Config = defaultConfig)
    {
        this.config = config;

        $("body`").append(this.buildWrapperHtml());
    }

    public open(html: string): void
    {
        $().append(this.buildHtml());
        $(`#popup-${this.config.popUpId} .content`).append(html);
        this.positionContent();
        $(`#popup-${this.popUpId}`).show();
    }

    public close(): void
    {
        $(`#popup-${this.popUpId}`).hide();
        this.removeBind();
        $(`#popup-${this.popUpId}`).remove();
    }

    public isOpen(): boolean
    {
        return $(`#popup-${this.popUpId}`).is(":visible");
    }

    private positionContent(): void
    {

    }

    private bindClose(): void
    {
        $(`#popup-${this.popUpId} .content`).on("click", function (e) { e.stopPropagation(); return false; });
        $(`#popup-${this.popUpId} .cover, #popup-${this.popUpId} .close`).on("click", this.close);
    }

    private removeBind(): void
    {
        $("div#av-popup-cover, div#av-popup-close, div#av-cover-content").unbind("click", false);
    }

    private getHiddenDimensions(elem)
    {

    }

    private buildWrapperHtml(): string
    {
        return `
            <div id="popup-wrapper">
                <div class="cover"></div>
                <div id="popups"></div>
            </div>
        `;

    }
    private buildHtml(closeButton: boolean = this.config.closeButton): string
    {
        let popUpId = "popUp";
        if (!this.config.singlePopUp){
            popUpId += "-" + "SOMEID"; //TODO ID here
        }
        return `
            <div id="popup-${popUpId}" class="content">
                ${closeButton ? '<div class="close">CLOSE</div>' : ''}
            </div>
        `;
    }
}













define(function () {
    return function () {
        // public vars
        this.config = {
            useDefaultStyle: true,
            defaultStyles: {
                popupWrapper: "display:none;",
                cover: "position:fixed;top:0px;left:0px;bottom:0px;right:0px;z-index:100;background-color:#ccc;background-color:rgba(0,0,0,0.6);cursor:pointer;",
                contentWrapper: "position:fixed;background-color:#fff;border-radius:10px;box-shadow:#000 6px 6px 6px;z-index:101;display:inline-block;min-width:200px;max-width:1000px;padding:5px;", // position caluculated by js
                closeButton: "position:absolute;right:5px;text-decoration:underline;cursor:pointer;"
            },
            mountSelector: "body"
        };

        // public methods
        this.openPopup = function (html) {
            _createElements();

            $("div#av-popup-content").append(html);
            _positionContent();
            $("div#av-popup-wrapper").show();

            _bindClose();
        };
        this.closePopup = function (e) {
            $("div#av-popup-wrapper").hide();
            _removeBind();
            $("div#av-popup-wrapper").remove();
        };
        this.isOpen = function () {
            return $("div#av-popup-wrapper").is(":visible");
        };

        // private methods
        var _createElements = function () {
            if (!$("div#av-popup-cover").length) {
                $(this.config.mountSelector).append("<div id=\"av-popup-wrapper\"></div>");

                if (this.config.useDefaultStyle) {
                    $("div#av-popup-wrapper")[0].style.cssText = this.config.defaultStyles.popupWrapper;
                }
            }

            if (!$("div#av-popup-cover").length) {
                $("div#av-popup-wrapper")
                    .append("<div id=\"av-popup-cover\"></div>");

                if (this.config.useDefaultStyle) {
                    $("div#av-popup-cover")[0].style.cssText = this.config.defaultStyles.cover;
                }
            }

            if (!$("div#av-popup-content").length) {
                $("div#av-popup-wrapper").append("<div id=\"av-popup-content\"></div>");

                if (this.config.useDefaultStyle) {
                    $("div#av-popup-content")[0].style.cssText = this.config.defaultStyles.contentWrapper;
                }
            }

            $("div#av-popup-content")
                .html("<div id=\"av-popup-close\">CLOSE</div>");

            if (this.config.useDefaultStyle) {
                $("div#av-popup-close")[0].style.cssText = this.config.defaultStyles.closeButton;
            }
        }.bind(this);

        var _positionContent = function () {
            // var dims = _getHiddenDimensions($("div#av-popup-content")),
            //   mTop = (parseInt($(window).height()) - parseInt(dims.outerHeight)) / 2,
            //   mLeft = (parseInt($(window).width()) - parseInt(dims.outerWidth)) / 2;

            $("div#av-popup-content").css({
                "left": '50%',
                "top": '50%',
                transform: 'translateX(-50%) translateY(-50%)',
                "max-height": (parseInt($(window).height()) - 50) + "px",
                "overflow": "auto"
            });
        }.bind(this);

        var _bindClose = function () {
            $("div#av-cover-content").on("click", function (e) { e.stopPropagation(); return false; });
            $("div#av-popup-cover, div#av-popup-close").on("click", this.closePopup);
        }.bind(this);

        var _removeBind = function () {
            $("div#av-popup-cover, div#av-popup-close, div#av-cover-content").unbind("click", false);
        }.bind(this);

        var _getHiddenDimensions = function (elem) {
            // let the hack begin
            var clone = elem.clone(),
                dims = {};

            clone.css({
                visibility: "hidden",
                display: "block",
                position: "absolute",
                "max-height": (parseInt($(window).height()) - 50) + "px",
                "overflow": "auto"
            });
            $("body").append(clone);
            $("img", clone).css({ "max-height": ($(window).innerHeight() - 90) + "px" });

            dims.height = clone.height();
            dims.width = clone.width();
            dims.outerHeight = clone.outerHeight();
            dims.outerWidth = clone.outerWidth();

            clone.remove();
            return dims;
        }.bind(this);
    };
});