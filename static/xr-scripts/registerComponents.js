AFRAME.registerComponent("on-image-found", {
	schema: {
		name: { type: "string" },
	},
	init: function () {
		let currentMarker;
		console.log("on-image-found registered");
		const object3D = this.el.object3D;
		const name = this.data.name;
		object3D.visible = false;

		const showImage = ({ detail }) => {
			currentMarker = detail.name;
			// if (name != detail.name) {
			// 	return
			// }
			object3D.position.copy(detail.position);
			object3D.quaternion.copy(detail.rotation);
			object3D.scale.set(detail.scale, detail.scale, detail.scale);
			object3D.visible = true;
		};
		const hideImage = ({ detail }) => {
			if (currentMarker != detail.name) {
				return;
			}
			object3D.visible = false;
		};

		this.el.sceneEl.addEventListener("xrimagefound", showImage);
		this.el.sceneEl.addEventListener("xrimageupdated", showImage);
		this.el.sceneEl.addEventListener("xrimagelost", hideImage);
	},
});
AFRAME.registerComponent("opacity-video", {
	init: function () {
		console.log("=================LOADED====================")
		this.el.addEventListener('materialvideoloadeddata', e => {
			// grab the material
			let material = this.el.getObject3D("mesh").material;
			// swap the format
			material.map.format = THREE.RGBAFormat;
			material.map.needsUpdate = true;
		 })
	},
});
