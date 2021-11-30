
/**
 * a pointlighter for the hole scenery
*/
function generatePointLight(color, intensity) {
    let light = new THREE.PointLight(color, intensity);
    light.castShadow = true;
    return light;
}


/**
 * The Lighter for the hole scenery
*/
function generateAmbientLighting(color, intensity) {
    return new THREE.AmbientLight(color, intensity);
}



