# Popup - Configurable jquery modal

## Quick Start 
Include the filse
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

<script src="dst/PopUp.min.js"></script>
<link rel="stylesheet" type="text/css" href="dst/PopUp.min.css" />
<!-- you really want to be creating your own style rather than using this one, 
     it by design looks terrible -->
```
initialise the popup
```js
var modal = new PopUp({
    centerHeader: false
})
```
trigger the popup
```js
$("#popup-example").on("click", function() {
    popup.open(
        `Bacon ipsum dolor amet landjaeger chislic porchetta buffalo, turkey sirloin pig tongue shankle chuck ham hock picanha kielbasa hamburger strip steak. Strip steak porchetta pig beef brisket beef ribs. Andouille beef turkey ground round, salami turducken alcatra pork strip steak shankle shank meatball ham hock short ribs. Tongue shank sausage meatloaf. Cupim fatback bresaola, leberkas brisket turducken tongue rump shoulder pork alcatra doner ground round strip steak. Ball tip short ribs buffalo t-bone pig pastrami beef sausage pork belly tail shankle venison chicken biltong salami.<br><br>Shank pancetta ball tip, venison drumstick beef chicken biltong. Andouille pork loin hamburger kevin bresaola corned beef. Turducken flank brisket tri-tip kevin pig alcatra sirloin jowl meatloaf pork picanha beef jerky chuck. Rump prosciutto bacon, ham drumstick landjaeger ball tip. Meatball pig turkey, salami shank tenderloin buffalo doner fatback picanha spare ribs biltong sausage.<br><br>`,
        "HEADER TEXT"
    );
});
```

## API 
| Method | Description |
| --- | --- |
| .open(body: string, header: string = "") | Open the modal with the given content |
| .close() | close the open modal |
| .clean() | clear out the existing modal dom |
| .isOpen(): boolean | check if the modal is currently open |

## Configuration
| Key | Default value | Description |
| --- | --- | --- |
| closeButton | true | If the close button should be shown |
| backgroundCanClosePopup | true | if clicking on the transparent cover will close the popup or not |
| centerHeader | true | if the header should be centered or not |
