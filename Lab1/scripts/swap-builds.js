


function generateTemplateHTML(build_name){
    let html_template = `
      <div class="builds-grid-container">
      <img class="runes round-edge" src="../resources/builds/runes_${build_name}.png" alt="${build_name}">
      <aside class="chose-build-container round-edge">
      </aside>
      <img class="build round-edge" src="../resources/builds/build_${build_name}.png" alt="${build_name}">
      </div>`;


    return html_template;
}


function swapBuildInDOM(stringTemplate){
    let buildContainer = document.getElementById("article-intro");
    buildContainer.innerHTML = stringTemplate;
}

