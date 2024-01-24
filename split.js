document.getElementById('editor').addEventListener('input', function() {
    var htmlContent = document.getElementById('editor').value;
    document.getElementById('previewText').innerHTML = htmlContent;
});
document.getElementById('editor').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        var cursorPos = document.getElementById('editor').selectionStart;
        var v = document.getElementById('editor').value;
        var textBefore = v.substring(0,  cursorPos );
        var textAfter  = v.substring( cursorPos, v.length );
        document.getElementById('editor').value = textBefore + "<br>" + textAfter;
        cursorPos = cursorPos + "<br>".length; // update the cursor position
        document.getElementById('editor').setSelectionRange(cursorPos, cursorPos); // set the cursor position
    }
});
document.getElementById('h1Button').addEventListener('click', function() {
    var cursorPos = document.getElementById('editor').selectionStart;
    var v = document.getElementById('editor').value;
    var textBefore = v.substring(0,  cursorPos );
    var textAfter  = v.substring( cursorPos, v.length );
    document.getElementById('editor').value = textBefore + '<h1 class="h1"></h1>' + textAfter;
});
document.getElementById('sitextfield').addEventListener('click', function() {
    var cursorPos = document.getElementById('editor').selectionStart;
    var v = document.getElementById('editor').value;
    var textBefore = v.substring(0,  cursorPos );
    var textAfter  = v.substring( cursorPos, v.length );
    document.getElementById('editor').value = textBefore + '<span style="font-size: px; font-family: \'Arial\';"></span>' + textAfter;
});

document.getElementById('addBild').addEventListener('click', function() {
    var cursorPos = document.getElementById('editor').selectionStart;
    var v = document.getElementById('editor').value;
    var textBefore = v.substring(0,  cursorPos );
    var textAfter  = v.substring( cursorPos, v.length );
    document.getElementById('editor').value = textBefore + '<img src= "" style="object-fit: cover; object-position: center">' + textAfter;
});

document.getElementById('stextfield').addEventListener('click', function() {
    var cursorPos = document.getElementById('editor').selectionStart;
    var v = document.getElementById('editor').value;
    var textBefore = v.substring(0,  cursorPos );
    var textAfter  = v.substring( cursorPos, v.length );
    document.getElementById('editor').value = textBefore + '<p style="font-size: px; font-family: \'Arial\';text-align: center;"></p>' + textAfter;
});
document.getElementById('h2Button').addEventListener('click', function() {
    var cursorPos = document.getElementById('editor').selectionStart;
    var v = document.getElementById('editor').value;
    var textBefore = v.substring(0,  cursorPos );
    var textAfter  = v.substring( cursorPos, v.length );
    document.getElementById('editor').value = textBefore + '<h2 class="h2"></h2>' + textAfter;
});

document.getElementById('expandButton').addEventListener('click', function() {
    var toolsDiv = document.querySelector('.tools');
    var expandButton = document.getElementById('expandButton');
    if (toolsDiv.style.maxHeight !== "100px") {
        toolsDiv.style.maxHeight = "100px";
        toolsDiv.style.padding = "5px";
        expandButton.classList.add('expanded');
    } else {
        toolsDiv.style.maxHeight = "0";
        toolsDiv.style.padding = "0";
        expandButton.classList.remove('expanded');
    }
});
document.getElementById('fontSelector').addEventListener('change', function() {
    var selectedFont = this.value;
    document.getElementById('editor').style.fontFamily = selectedFont;
    document.getElementById('preview').style.fontFamily = selectedFont;
});
document.getElementById('fontSizeInput').addEventListener('input', function() {
    var fontSize = this.value + 'px';
    document.getElementById('previewText').style.fontSize = fontSize;
});
document.getElementById('editor').addEventListener('input', function() {
    localStorage.setItem('editorContent', this.value);
});
window.addEventListener('DOMContentLoaded', (event) => {
    var savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
        document.getElementById('editor').value = savedContent;
    }
});
document.getElementById('bild').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});
document.getElementById('fileInput').addEventListener('change', function() {
    if (this.files && this.files[0]) {
        var file = this.files[0];

        // Create a new FileReader object
        var reader = new FileReader();

        reader.onload = function(e) {
            // Create a new image element
            var img = document.createElement('img');

            // Set the src of the image to the data URL of the file
            img.src = e.target.result;
            img.className = "previewImage";

            // Append the image to the #previewText div
            document.getElementById('preview2').appendChild(img);
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
    }
});

document.getElementById('editor').addEventListener('input', function() {
    var htmlContent = document.getElementById('editor').value;

    // Get the sources of the images in the #preview2 div
    var imageSources = Array.from(document.querySelectorAll('#preview2 img')).map((img, index) => {
        return { name: 'img' + (index + 1), src: img.src };
    });

    // Replace simple names with actual sources
    imageSources.forEach(({ name, src }) => {
        var regex = new RegExp('<img[^>]*src\\s*=\\s*[\'"]?' + name + '[\'"]?[^>]*>', 'gi');
        var replacement = '<img src="' + src + '">';
        htmlContent = htmlContent.replace(regex, replacement);
    });

    document.getElementById('previewText').innerHTML = htmlContent;
});