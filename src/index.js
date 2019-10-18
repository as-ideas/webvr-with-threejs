import {
  BoxGeometry,
  Clock,
  Color,
  CylinderGeometry,
  Group,
  HemisphereLight,
  LineSegments,
  LineBasicMaterial,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer
 } from 'three';
import { WEBVR } from 'three/examples/jsm/vr/WebVR.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry';

start();

function start() {
  let camera, clock, scene, renderer, room, cube;

  function render() {
    const delta = clock.getDelta();

    cube.rotateY( 0.2 * delta );
    cube.rotateX( 0.2 * delta );

    renderer.render( scene, camera );
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function init() {
      // Clock
      clock = new Clock();

      // SCENE
      scene = new Scene();
      scene.background = new Color( 0x000000 );

      // CAMERA
      const cameraFixture = new Group();
      camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 30 );
      cameraFixture.add( camera );
      cameraFixture.position.set( 0, 1, 3 );
      scene.add( cameraFixture );

      // ROOM
      room = new LineSegments(
        new BoxLineGeometry( 10, 6, 10, 10, 10, 10 ),
        new LineBasicMaterial( { color: 0x808080 } )
      );
      room.geometry.translate( 0, 3, 0 );
      scene.add( room );

      // LIGHT
      const light = new HemisphereLight( 0xffffff, 0x444444 );
      light.position.set( 1, 1, 1 );
      scene.add( light );

      // RENDERER
      renderer = new WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      // VR ENABLED
      renderer.vr.enabled = true;
      document.body.appendChild( WEBVR.createButton( renderer ) );

      // RESIZE EVENT HOOK
      window.addEventListener( 'resize', onWindowResize, false );

      // LOAD TEXTURE
      const texture = new TextureLoader().load( 'images/ideas.png' );
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

      // ADD CUBE OBJECT
      const geometry = new BoxGeometry( 1, 1, 1 );
      const material = new MeshPhongMaterial( { color: 0x00ff00, map: texture } );
      cube = new Mesh( geometry, material );
      cube.position.y = 1;
      scene.add( cube );

      // RENDER CONTROLLER
      const controller = renderer.vr.getController( 0 );
      const cylinderGeometry = new CylinderGeometry( 0.025, 0.025, 1, 32 );
      const cylinderMaterial = new MeshPhongMaterial( {color: 0xffff00} );
      const cylinder = new Mesh( cylinderGeometry, cylinderMaterial );
      cylinder.geometry.translate( 0, 0.5, 0 );
      cylinder.rotateX( - 0.25 * Math.PI );
      controller.add( cylinder );
      cameraFixture.add( controller );

      // ADD RENDER LOOP
      renderer.setAnimationLoop( render );
    }

  init();
}
