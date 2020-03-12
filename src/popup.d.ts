declare class PopUp
{
    constructor(config: Config);
    open(body: string, header: ?string): void;
    close(): void;
    isOpen(): boolean;
}

declare interface Config
{
    closeButton: boolean,
    backgroundCanClosePopup: boolean,
    centerHeader: boolean
};
