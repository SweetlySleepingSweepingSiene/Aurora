// Restores the v1.2.1 artwork from normal JPEG assets.
const ASSET='Aurora_recovered_assets/';
const sceneFiles=['fireplace-cozy-cabin','fireplace-modern-home','fireplace-library','snow-cabin-in-snow','snow-snowy-forest','snow-mountain-view','rain-city-window','rain-porch','rain-garden','thunderstorm-lakeside','thunderstorm-country-home','thunderstorm-coastal','ocean-calm-waves','ocean-rocky-shore','ocean-tropical','brook-forest-stream','brook-woodland','brook-mountain-brook','summer-dawn-lakeside','summer-dawn-countryside','summer-dawn-mountain','summer-dusk-lakeside','summer-dusk-countryside','summer-dusk-coastal','aquarium-community-tank','aquarium-coral-reef','aquarium-angelfish','aquarium-jellyfish','aquarium-planted-tank','aquarium-koi-pond'];
const clockFiles=['alarm-classic','alarm-info-bar','alarm-stacked','alarm-cards','alarm-extra-info','flip-traditional','flip-wide','flip-split-info','flip-minimal','flip-color-accent','nixie-classic','nixie-with-date','nixie-full-info','nixie-minimal','nixie-modern-hybrid','analog-clean','analog-modern','analog-classic','analog-minimal','analog-full-info','minimal-clean-text','minimal-thin','minimal-subtle','minimal-corner','minimal-typographic'];
const visualizerFiles=['spectral-bloom','warp-speed','sonic-whirlpool','kaleidarchy','disco-biscuit','bouncy-mountains'];
scenes.forEach((s,i)=>s.img=`${ASSET}scenes/${sceneFiles[i]}.jpg`);
clockFaces.forEach((s,i)=>s.img=`${ASSET}clockfaces/${clockFiles[i]}.jpg`);
visualizers.forEach((s,i)=>s.img=`${ASSET}visualizers/${visualizerFiles[i]}.jpg`);
photoImages.forEach((_,i)=>photoImages[i]=`${ASSET}photos/photo-${String(i+1).padStart(2,'0')}.jpg`);
relaxationOptions[0].img=`${ASSET}relaxation/breathing.jpg`;
relaxationOptions[1].img=`${ASSET}relaxation/progressive-muscle-relaxation.jpg`;
relaxationOptions[2].img=`${ASSET}relaxation/guided-positive-stuff.jpg`;

const bg=(el,url)=>{if(el&&url)el.style.backgroundImage=`url('${url}')`};

// Scene Library category artwork.
['ambient','music-visualizer','clock-faces','photo-album','relaxation-assistant'].forEach((name,i)=>bg(document.querySelectorAll('#library .pic')[i],`${ASSET}ui/${name}.jpg`));

// Existing list cards were created by app.js; apply the recovered art to them.
document.querySelectorAll('#ambientList .scene').forEach((el,i)=>bg(el,scenes[i].img));
document.querySelectorAll('#visualizerList .scene').forEach((el,i)=>bg(el,visualizers[i].img));

// Clock style cards use the first face in each family.
const firstClockByCategory={'Alarm Clock':0,'Flip Clock':5,'Nixie Tube':10,'Analog':15,'Minimalist':20};
document.querySelectorAll('#clockStyleList .scene').forEach((el,i)=>bg(el,clockFaces[firstClockByCategory[clockStyleOrder[i]]].img));

// Photo and relaxation grids.
document.querySelectorAll('#photoGrid .photoThumb').forEach((el,i)=>bg(el,photoImages[i]));
document.querySelectorAll('#relaxGrid .relaxTile').forEach((el,i)=>bg(el,relaxationOptions[i].img));

// Wrap detail-view functions so hero artwork follows the selected item.
const _openScene=openScene; openScene=function(i){_openScene(i);bg(document.getElementById('sceneHero'),scenes[i].img)};
const _openVisualizer=openVisualizer; openVisualizer=function(i){_openVisualizer(i);bg(document.getElementById('visualizerHero'),visualizers[i].img)};
const _openClockStyle=openClockStyle; openClockStyle=function(cat){_openClockStyle(cat);document.querySelectorAll('#clockFaceList .scene').forEach((el,j)=>{const faces=clockFaces.filter(f=>f.category===cat);bg(el,faces[j].img)})};
const _openClockFace=openClockFace; openClockFace=function(i){_openClockFace(i);bg(document.getElementById('clockFaceHero'),clockFaces[i].img)};
const _openPhoto=openPhoto; openPhoto=function(i){_openPhoto(i);bg(document.getElementById('photoHero'),photoImages[i])};
const _stepPhoto=stepPhoto; stepPhoto=function(n){_stepPhoto(n);bg(document.getElementById('photoHero'),photoImages[currentPhotoIndex])};

// Restore selected artwork on the Now screen.
renderNowScene=function(){
  const now=document.getElementById('nowScene'),type=localStorage.getItem('auroraNowType')||'ambient';
  let img='';
  if(type==='ambient') img=scenes[selectedSceneIndex]?.img;
  if(type==='clock') img=clockFaces[selectedClockFaceIndex]?.img;
  if(type==='visualizer') img=visualizers[selectedVisualizerIndex]?.img;
  if(type==='photo') img=photoImages[Number(localStorage.getItem('auroraSelectedPhoto')||0)];
  if(img) bg(now,img);
};
renderNowScene();