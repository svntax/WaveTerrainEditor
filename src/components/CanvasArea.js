import React from "react";
import "./CanvasArea.css";

class CanvasArea extends React.Component {	
	constructor(props){
		super(props);
		this.canvasRef = React.createRef();
	}
	
	componentDidMount(){
		this.redrawMap();
	}
	
	componentDidUpdate(){
		this.redrawMap();
	}
	
	redrawMap = () => {
		const canvas = this.canvasRef.current;
		const ctx = canvas.getContext("2d");
		
		//Clear the canvas
		ctx.fillStyle = this.props.bgColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		const surfaceWave = this.props.surfaceWave;
		const topWave = this.props.topWave;
		const bottomWave = this.props.bottomWave;
		
		const surfaceWaveOffsetY = Number.parseInt(this.props.surfaceWaveOffsetY);
		const topWaveOffsetY = Number.parseInt(this.props.topWaveOffsetY);
		const bottomWaveOffsetY = Number.parseInt(this.props.bottomWaveOffsetY);
		
		//Fill everything below the surface wave
		ctx.fillStyle = "#000000";
		const plot = this.props.surfaceWave.getPlot();
		const topPlot = this.props.topWave.getPlot();
		const bottomPlot = this.props.bottomWave.getPlot();
		for(let i = 0; i < plot.length; i++){
			ctx.fillRect(i, plot[i] + surfaceWaveOffsetY, 1, canvas.height*2);
		}
		
		//Cut holes into terrain whenever bottomWave is above topWave
		ctx.fillStyle = this.props.bgColor;
		for(let x = 0; x < plot.length; x++){
			if(bottomPlot[x] + bottomWaveOffsetY < topPlot[x] + topWaveOffsetY){
				ctx.fillRect(x, bottomPlot[x] + bottomWaveOffsetY, 1, topPlot[x] + topWaveOffsetY - bottomPlot[x] - bottomWaveOffsetY);
			}
		}
		
		//Debug drawing - vertices
		if(this.props.verticesVisible){
			ctx.fillStyle = "#ff0000";
			for(let i = 0; i <= surfaceWave.numVertices; i++){
				let x = i * Math.floor(surfaceWave.waveWidth / surfaceWave.numVertices);
				if(i == surfaceWave.numVertices){
					x = surfaceWave.waveWidth - 8;
				}
				ctx.fillRect(x, plot[x] + surfaceWaveOffsetY, 8, 8);
			}
			ctx.fillStyle = "#00ff00";
			for(let i = 0; i <= topWave.numVertices; i++){
				let x = i * Math.floor(topWave.waveWidth / topWave.numVertices);
				if(i == topWave.numVertices){
					x = topWave.waveWidth - 1;
				}
				ctx.fillRect(x, topPlot[x] + topWaveOffsetY, 8, 8);
			}
			ctx.fillStyle = "#0000ff";
			for(let i = 0; i <= bottomWave.numVertices; i++){
				let x = i * Math.floor(bottomWave.waveWidth / bottomWave.numVertices);
				if(i == bottomWave.numVertices){
					x = bottomWave.waveWidth - 1;
				}
				ctx.fillRect(x, bottomPlot[x] + bottomWaveOffsetY, 8, 8);
			}
		}
		
		//Debug drawing - wave surface lines
		if(this.props.waveSurfacesVisible){
			ctx.fillStyle = "#ff0000";
			for(let x = 0; x <= plot.length; x++){
				ctx.fillStyle = "#ff0000";
				ctx.fillRect(x, plot[x] + surfaceWaveOffsetY, 2, 2);
				ctx.fillStyle = "#00ff00";
				ctx.fillRect(x, topPlot[x] + topWaveOffsetY, 2, 2);
				ctx.fillStyle = "#0000ff";
				ctx.fillRect(x, bottomPlot[x] + bottomWaveOffsetY, 2, 2);
			}
		}
	}

	render(){
		return (
			<div className="canvas-root">
				<canvas ref={this.canvasRef} width={this.props.width} height={this.props.height} onClick={this.props.generateRandomMap} />
			</div>
		);
	}
}

export default CanvasArea;