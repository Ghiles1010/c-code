
var done = document.getElementById("done");
var img = document.getElementById("screenShot");
var test = document.getElementById("test");
var form = document.getElementById("form");
var res = "";


var scr_url = window.location.search.substr(1);
img.setAttribute("src", scr_url)


cropper = new Cropper(img, {
    crop(event){

        const imgURL = this.cropper.getCroppedCanvas().toDataURL();
        test.src = imgURL;

    }
});



 

done.addEventListener("click", () =>{

    
    var ImageURL = test.src
    var block = ImageURL.split(";");
    // Get the content type of the image
    var contentType = block[0].split(":")[1];// In this case "image/gif"
    // get the real base64 content of the file
    var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

    // Convert it to a blob to upload
    var blob = b64toBlob(realData, contentType);

    var formDataToUpload = new FormData(form);
    formDataToUpload.append("image", blob);

    $(document.body).css({'cursor' : 'wait'});

    $.ajax({
        url:"https://c-code.herokuapp.com/",
        data: formDataToUpload,
        type:"POST",
        contentType:false,
        processData:false,
        cache:false,
        error:function(err){
            console.error(err);
        },
        success:function(data){
            console.log(data);
            copyStringToClipboard(data);
            alert("Success: text has been copied to clipboard !");
        },
        complete:function(){
            $(document.body).css({'cursor' : 'default'});
            console.log("Request finished.");
        }
    });


})



function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand("copy")
    // Remove temporary element
    document.body.removeChild(el);
 }

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}





