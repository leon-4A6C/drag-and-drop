document.querySelectorAll(".drag-drop-field").forEach(x => {
  x.addEventListener("click", e => x.querySelector(".drag-drop-file").click())
  x.addEventListener("dragover", e => dragDropHandler(x)(e), false);
  x.addEventListener("dragleave", e => dragDropHandler(x)(e), false);
  x.addEventListener("drop", e => dragDropHandler(x)(e), false);
})

document.querySelectorAll(".drag-drop-file").forEach(x => {
  x.addEventListener("change", e => dragDropHandler(x)(e), false);
})

const files = []

const dragDropHandler = x => e => {
  if(x.classList.contains("drag-drop-file")) {
    x = x.parentElement || x.parentNode
  }
  e.preventDefault()
  e.stopPropagation()
  const tmpFiles = e.target.files || e.dataTransfer.files;
  Array.from(tmpFiles).forEach((file, i) => {
    files.push(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener("load", e => {
      console.log(e)
      x.querySelector(".drag-drop-item-container").innerHTML += `
      <div class="drag-drop-item">
        <img src="${e.target.result}" alt="img">
      </div>
      `;
    })
    reader.addEventListener("progress", e => console.log(i, e.loaded / e.total))
  })
}

document.querySelectorAll(".drag-drop-form").forEach(x => {
  x.addEventListener("submit", e => {
    e.preventDefault()
    e.stopPropagation()

    const data = new FormData(x);
    data.append("files[]", files);
    fetch(x.action, {
      method: x.method,
      body: data
    });

  }, false);
});