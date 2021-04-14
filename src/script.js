import './scss/index.scss';
import './utils/utils';
import * as THREE from 'three';
import {imageTargetPipelineModule} from './js/imagetarget';
import {transparentVideo} from './js/transparentVideo';
import AllyUI from './js/ui.js'

window.onload = () =>{
  const ALLY_UI = new AllyUI();

  // ALLY_UI.setActiveSection('0');
  transparentVideo();
  ALLY_UI.setStartButton(()=>{
    XRExtras.Loading.showLoading({onxrloaded})
    ALLY_UI.setActiveSection(2);
  })
}

const onxrloaded = () => {
  // If your app only interacts with image targets and not the world, disabling world tracking can
  // improve speed.
  XR8.XrController.configure({disableWorldTracking: true,imageTargets: ['one','five','ten','twenty','fifty','hundred']})
  XR8.addCameraPipelineModules([  // Add camera pipeline modules.
    // Existing pipeline modules.
    XR8.GlTextureRenderer.pipelineModule(),      // Draws the camera feed.
    XR8.Threejs.pipelineModule(),                // Creates a ThreeJS AR Scene.
    XR8.XrController.pipelineModule(),           // Enables SLAM tracking.
    XRExtras.AlmostThere.pipelineModule(),       // Detects unsupported browsers and gives hints.
    XRExtras.FullWindowCanvas.pipelineModule(),  // Modifies the canvas to fill the window.
    XRExtras.Loading.pipelineModule(),           // Manages the loading screen on startup.
    XRExtras.RuntimeError.pipelineModule(),      // Shows an error image on runtime error.
    // Custom pipeline modules.
    imageTargetPipelineModule(),  // Draws a frame around detected image targets.
  ])
  // Open the camera and start running the camera run loop.
  //document.body.insertAdjacentHTML('beforeend', camerafeedHtml)
  XR8.run({canvas: document.getElementById('camerafeed')})
}


// Show loading screen before the full XR library has been loaded.
// XRExtras.Loading.showLoading({onxrloaded})
