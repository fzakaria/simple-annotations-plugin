# Grafana Simple Annotations Plugin

*Frustrated with using a datasource that doesn't support annotations?*

This is a *simple annotation* plugin for [Grafana](https://grafana.com/) that works with **any** Datasource!

It works by using the `dashboard.json` itself as the store for annotations -- this means that you can easily backup / save / share your annotations.

```json
  "annotations": {
    "list": [
      {
        "datasource": "${DS_SIMPLE_ANNOTATION}",
        "enable": true,
        "hide": false,
        "iconColor": "rgba(255, 96, 96, 1)",
        "limit": 100,
        "name": "Deployments",
        "queries": [
          {
            "date": "2017-09-03T19:56:36.000Z",
            "text": "First Deployment"
          },
          {
            "date": "2017-09-03T20:56:53.000Z",
            "text": "Second Deployment"
          },
          {
            "date": "2017-09-03T21:56:56.000Z",
            "text": "Third Deployment"
          }
        ],
        "showIn": 0,
        "type": "alert"
      }
    ]
  },
```

![Screenshot 1](https://raw.githubusercontent.com/fzakaria/simple-annotations-plugin/master/dist/img/screenshot_1.png "Screenshot 1")

![Screenshot 2](https://raw.githubusercontent.com/fzakaria/simple-annotations-plugin/master/dist/img/screenshot_2.png "Screenshto 2")


## Development

```bash
mkdir grafana
export GOPATH=`pwd`
go get github.com/grafana/grafana
cd $GOPATH/src/github.com/grafana/grafana
go run build.go setup
go run build.go build
npm install
npm install -g grunt-cli
grunt
mkdir -p data/plugins
ln -s ~/Development/simple-annotations data/plugins/simple-annotations
./bin/grafana-server
```