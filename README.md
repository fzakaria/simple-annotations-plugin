# Grafana Simple Annotations Plugin


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