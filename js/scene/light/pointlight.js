
/**
 * The Lighter for the hole scenery
 */
function generatePointLight(color, intensity) {
    let light = new THREE.PointLight(color, intensity);
    light.castShadow = true;
    return light;
}
