const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')


let photosArray = [];


// Unsplash API
// ajouter random et count 
const count = 10;
const apiKey = `-NYaQk4KkgFMrsoq24C9DIBaEGaCZgtFfinqJRIzPqg`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to Set Attributes on DOM Element
function setAttribute(element, attriutes){
    for (const  key in attriutes){
        element.setAttribute(key, attriutes[key])
    }
}



// Create Element For Links & Photos, add to DOM
function displayPhotos(){
    // for function for each object in photosArray
    photosArray.forEach((photo)=>{
        //Create <a></a> to link to unsplash
        const item = document.createElement('a');
        setAttribute(item,{
            href: photo.links.html,
            target: '_blank'
        })
        // create <img> for photo
        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // put <img> inside <a>, then put both inside amageContainer Element
        item.appendChild(img)
        imageContainer.appendChild(item);



    });
}

// Get photos from Unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()
        
    }catch(error){
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetWidth
        -1000){
            getPhotos();
            console.log('load more')
        }
    });

// On Load 
getPhotos();