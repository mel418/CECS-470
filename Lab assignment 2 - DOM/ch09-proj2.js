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

        // add feature rectangles
        displayFeatures(painting.features);
    }

    // function to display all features
    function displayFeatures(features) {
        for (let feature of features) {
            displaySingleFeatureRectangle(feature);
        }
    }

    // function to display one rectangle
    function displaySingleFeatureRectangle(feature) {
        const rect = document.createElement("div");
        rect.className = "box" // css class for styling
        rect.style.position = "absolute"; // position over the image
        rect.style.left = feature.upperLeft[0] + "px"; // x position
        rect.style.top = feature.upperLeft[1] + "px"; // y position
        rect.style.width = (feature.lowerRight[0] - feature.upperLeft[0]) + "px"; // width
        rect.style.height = (feature.lowerRight[1] - feature.upperLeft[1]) + "px"; // height

        // add hover events
        rect.addEventListener("mouseover", function () {
            description.textContent = feature.description;
        });
        rect.addEventListener("mouseout", function () {
            description.textContent = "";
        });

        figure.appendChild(rect); // add rectangle to figure
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

