<template>
  <div
    class="grey--text"
    @click="open"
    @dragover="over"
    @drop="drop">
    <p/>
    <span>Upload an existing project file</span>
    <span>or pick a video below to start a new project</span>
    <span
      id="error"
      class="error--text"
      v-if="error">
      <v-icon
        small
        @click="cleanup">cancel
      </v-icon>
      {{ error }}
    </span>
    <p v-else/>
    <input
      ref="selector"
      type="file"
      id="files"
      @change='load'/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      error: null
    }
  },
  methods: {
    load(evt) {
      const files = evt.target.files

      this.launch(files)
    },
    open() {
      this.$refs.selector.click()
    },
    over(evt) {
      evt.stopPropagation()
      evt.preventDefault()
      evt.dataTransfer.dropEffect = 'copy'
    },
    drop(evt) {
      evt.stopPropagation()
      evt.preventDefault()

      const files = evt.dataTransfer.files

      this.launch(files)
    },
    cleanup(evt) {
      evt.stopPropagation()
      evt.preventDefault()
      this.error = null
    },
    launch(files) {
      if (files.length > 1) {
        this.error = 'Error: cannot open multiple files'
      } else if (files[0].type !== 'application/json') {
        this.error = 'Error: expected a JSON file'
      } else {
        const reader = new FileReader()

        reader.onload = () => {
          const project = JSON.parse(reader.result)
          this.$router.push({
            name: 'edit',
            params: {
              title: project.title,
              source: {
                url: project.source.url,
                type: project.source.type
              },
              restored: project.labels
            }
          })
        }
        reader.readAsText(files[0])
      }
    }
  }
}
</script>
<style scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed grey;
    border-radius: 25px;
    cursor: pointer;
}
input {
    display: none;
}
</style>
