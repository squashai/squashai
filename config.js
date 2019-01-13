export default {
  videoListUrl: process.env.VUE_APP_VIDEO_LIST_URL ||
    'https://squashai.gitlab.io/media/list.json',
  datasetListUrl: process.env.VUE_APP_DATASET_LIST_URL ||
    'https://api.github.com/repos/squashai/datasets/contents/'
}
