// wait for the html to load
document.addEventListener("DOMContentLoaded", function () {
    const paintings = JSON.parse(content);    
    const list = document.querySelector("#paintings ul");
    const figure = document.querySelector("#details figure");
    const title = document.querySelector("#title");
    const artist = document.querySelector("#artist");
    const description = document.querySelector("#description"); 
    console.log(paintings)

    // function to create the thumbnail list
    function  generateThumbList() {
        for (let p of paintings) {
            const item = document.createElement("li"); // create <li> element
            const thumb = document.createElement("img"); // create <img> element
            thumb.src = "images/small/" + p.id + ".jpg"; // set image source
            thumb.alt = p.title; // set alt text for accessibility
            thumb.dataset.id = p.id; // store the painting id
            item.appendChild(thumb); // put <img> inside the <li>
            list.appendChild(item); // put <li> inside the <ul>
        }
    }

    // function to display the large painting
    function displayPaintingLarge(clickedThumb) {
        const id = clickedThumb.dataset.id; // get the painting id
        const painting = paintings.find(p => p.id === id); // find the paiting

        //update title and artist
        title.textContent = painting.title;
        artist.textContent = "By " + painting.artist;

        // clear previous content and add new image
        figure.innerHTML = ""; // remove old image and rectangles
        const largeImage = document.createElement("img");
        largeImage.src = "images/large/" + painting.id + ".jpg";
        figure.appendChild(largeImage);
    }

    // listen for clicks on the thumbnail list
    list.addEventListener("click", function (event) {
        if (event.target.tagName === "IMG") {
            displayPaintingLarge(event.target);
        }
    });

    // call the function to build the list
    generateThumbList();
});

