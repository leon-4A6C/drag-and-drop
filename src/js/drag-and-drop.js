document.querySelectorAll(".drag-drop-field").forEach(x => {
  x.addEventListener("click", e => x.querySelector(".drag-drop-file").click())
  x.addEventListener("dragover", dragDropHandler, false);
  x.addEventListener("dragleave", dragDropHandler, false);
  x.addEventListener("drop", dragDropHandler, false);
})

document.querySelectorAll(".drag-drop-file").forEach(x => {
  x.addEventListener("change", dragDropHandler, false);
})

function dragDropHandler(e) {
  e.preventDefault()
  e.stopPropagation()
  const files = e.target.files || e.dataTransfer.files;
  Array.from(files).forEach((x, i) => {
    const reader = new FileReader()
    reader.readAsDataURL(x)
    reader.addEventListener("load", e => console.log(i, e.loaded / e.total))
    reader.addEventListener("progress", e => console.log(i, e.loaded / e.total))
  })
}