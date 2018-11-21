import React from "react";
import "./App.css";

import CanvasArea from "./CanvasArea";
import MapWave from "../terrain_gen/MapWave";
import Button from "./Button";

const VERTICAL_OFFSET_MIN = -200;
const VERTICAL_OFFSET_MAX = 400;

class App extends React.Component {
	constructor(props){
		super(props);
		
		let surfaceWave = new MapWave(1280, 300, 12345);
		//surfaceWave.setOffsetY(48);
		surfaceWave.generateWave();
		
		let topWave = new MapWave(1280, 400, 12345);
		topWave.setNumVertices(16);
		//topWave.setOffsetY(90);
		topWave.generateWave();
		
		let bottomWave = new MapWave(1280, 400, 12345);
		bottomWave.setNumVertices(16);
		//bottomWave.setOffsetY(60);
		bottomWave.generateWave();
		
		this.state = {
			surfaceWave: surfaceWave,
			topWave: topWave,
			bottomWave: bottomWave,
			waveSurfacesVisible: true,
			verticesVisible: true,
			interpolationMethod: 1,
			mapData: "",
			surfaceWaveProperties: {
				numVertices: 12,
				verticalOffset: 48
			},
			topWaveProperties: {
				numVertices: 16,
				verticalOffset: 90
			},
			bottomWaveProperties: {
				numVertices: 16,
				verticalOffset: 60
			},
			surfaceVertices: "s,",
			topVertices: "t,",
			bottomVertices: "b,"
		};
	}
	
	componentDidMount() {
		this.setSurfaceVertices(this.state.surfaceWave.verticesList);
		this.setTopVertices(this.state.topWave.verticesList);
		this.setBottomVertices(this.state.bottomWave.verticesList);
	}
	
	exportMapData = () => {
		//this.setSurfaceVertices(this.state.surfaceWave.verticesList);
		//this.setTopVertices(this.state.topWave.verticesList);
		//this.setBottomVertices(this.state.bottomWave.verticesList);
		const rawData = this.state.surfaceVertices + this.state.topVertices + this.state.bottomVertices;
		const encodedData = window.btoa(rawData);
		this.setState({mapData: encodedData});
	}
	
	//Elements in list are (x,y) pairs
	setSurfaceVertices = (list) => {
		let verticesData = "s,";
		const yOffset = Number.parseInt(this.state.surfaceWaveProperties.verticalOffset);
		for(let i = 0; i < list.length; i++){
			verticesData += list[i].x + "," + (list[i].y + yOffset) + ",";
		}
		console.log(verticesData);
		this.setState({surfaceVertices: verticesData});
	}
	
	//Elements in list are (x,y) pairs
	setTopVertices = (list) => {
		let verticesData = "t,";
		const yOffset = Number.parseInt(this.state.topWaveProperties.verticalOffset);
		for(let i = 0; i < list.length; i++){
			verticesData += list[i].x + "," + (list[i].y + yOffset) + ",";
		}
		this.setState({topVertices: verticesData});
	}
	
	//Elements in list are (x,y) pairs
	setBottomVertices = (list) => {
		let verticesData = "b,";
		const yOffset = Number.parseInt(this.state.bottomWaveProperties.verticalOffset);
		for(let i = 0; i < list.length; i++){
			if(i < list.length - 1){
				verticesData += list[i].x + "," + (list[i].y + yOffset) + ",";
			}
			else{
				verticesData += list[i].x + "," + (list[i].y + yOffset);
			}
		}
		this.setState({bottomVertices: verticesData});
	}
	
	generateRandomMap = () => {
		let surfaceWave = new MapWave(1280, 300, 12345);
		let topWave = new MapWave(1280, 400, 12345);
		let bottomWave = new MapWave(1280, 400, 12345);
		
		surfaceWave.setInterpolationMethod(this.state.interpolationMethod);
		topWave.setInterpolationMethod(this.state.interpolationMethod);
		bottomWave.setInterpolationMethod(this.state.interpolationMethod);
		
		surfaceWave.setNumVertices(this.state.surfaceWaveProperties.numVertices);
		
		topWave.setNumVertices(this.state.topWaveProperties.numVertices);
		
		bottomWave.setNumVertices(this.state.bottomWaveProperties.numVertices);
		
		surfaceWave.generateWave();
		topWave.generateWave();
		bottomWave.generateWave();
		
		this.setSurfaceVertices(surfaceWave.verticesList);
		this.setTopVertices(topWave.verticesList);
		this.setBottomVertices(bottomWave.verticesList);
		
		this.setState({
			surfaceWave: surfaceWave,
			topWave: topWave,
			bottomWave: bottomWave
		});
	}
	
	onSurfaceWaveVerticesChange = (e) => {
		let surfaceWave = this.state.surfaceWave;
		surfaceWave.setNumVertices(e.target.value);
		surfaceWave.generateWave();
		this.setSurfaceVertices(surfaceWave.verticesList);
		this.setState({
			surfaceWave: surfaceWave,
			surfaceWaveProperties: {
				...this.state.surfaceWaveProperties,
				numVertices: e.target.value
			}
		});
	}
	
	onSurfaceWaveVerticalOffsetChange = (e) => {
		this.setState({
			surfaceWaveProperties: {
				...this.state.surfaceWaveProperties,
				verticalOffset: e.target.value
			}
		});
	}
	
	onTopWaveVerticesChange = (e) => {
		let topWave = this.state.topWave;
		topWave.setNumVertices(e.target.value);
		topWave.generateWave();
		this.setState({
			topWave: topWave,
			topWaveProperties: {
				...this.state.topWaveProperties,
				numVertices: e.target.value
			}
		});
	}
	
	onTopWaveVerticalOffsetChange = (e) => {
		this.setState({
			topWaveProperties: {
				...this.state.topWaveProperties,
				verticalOffset: e.target.value
			}
		});
	}
	
	onBottomWaveVerticesChange = (e) => {
		let bottomWave = this.state.bottomWave;
		bottomWave.setNumVertices(e.target.value);
		bottomWave.generateWave();
		this.setState({
			bottomWave: bottomWave,
			bottomWaveProperties: {
				...this.state.bottomWaveProperties,
				numVertices: e.target.value
			}
		});
	}
	
	onBottomWaveVerticalOffsetChange = (e) => {
		this.setState({
			bottomWaveProperties: {
				...this.state.bottomWaveProperties,
				verticalOffset: e.target.value
			}
		});
	}
	
	toggleWaveSurfaces = () => {
		this.setState({waveSurfacesVisible: !this.state.waveSurfacesVisible});
	}
	
	toggleVertices = () => {
		this.setState({verticesVisible: !this.state.verticesVisible});
	}
	
	handleSubmit = (e) => {
		//e.preventDefault();
	}
	
	changeInterpolationMethod = (e) => {
		let surfaceWave = this.state.surfaceWave;
		let topWave = this.state.topWave;
		let bottomWave = this.state.bottomWave;
		
		surfaceWave.setInterpolationMethod(e.target.value);
		topWave.setInterpolationMethod(e.target.value);
		bottomWave.setInterpolationMethod(e.target.value);
		
		surfaceWave.interpolateVertices();
		topWave.interpolateVertices();
		bottomWave.interpolateVertices();
		
		this.setState({
			surfaceWave: surfaceWave,
			topWave: topWave,
			bottomWave: bottomWave,
			interpolationMethod: e.target.value
		});
	}
	
	render(){
		return (
			<div className="app">
				<div className="ui-header">
					<h1>Terrain Editor</h1>
					<p>The terrain generation works as follows:</p>
					<ol>
						<li>Generate 3 waves called Surface, Top, and Bottom</li>
						<li>Create terrain below the Surface wave</li>
						<li>Remove terrain whenever the Bottom wave is above the Top wave</li>
					</ol>
				</div>
				<form className="ui-form" onSubmit={this.handleSubmit}>
					<div className="ui-wave-parameters" style={{background: "rgb(255, 128, 128)"}}>
						<strong>Surface Wave (Red)</strong>
						<div className="ui-form-element">
							<label>Vertices (2 to 25)</label>
							<input className="ui-slider" type="range" min="2" max="25" onChange={this.onSurfaceWaveVerticesChange} />
							<span>{this.state.surfaceWaveProperties.numVertices}</span>
						</div>
						<div className="ui-form-element">
							<label>Vertical Offset</label>
							<input className="ui-slider" type="range" min={VERTICAL_OFFSET_MIN} max={VERTICAL_OFFSET_MAX} onChange={this.onSurfaceWaveVerticalOffsetChange} />
							<span>{this.state.surfaceWaveProperties.verticalOffset}</span>
						</div>
					</div>
					<div className="ui-wave-parameters" style={{background: "rgb(128, 255, 128)"}}>
						<strong>Top Wave (Green)</strong>
						<div className="ui-form-element">
							<label>Vertices (2 to 25)</label>
							<input className="ui-slider" type="range" min="2" max="25" onChange={this.onTopWaveVerticesChange} />
							<span>{this.state.topWave.numVertices}</span>
						</div>
						<div className="ui-form-element">
							<label>Vertical Offset</label>
							<input className="ui-slider" type="range" min={VERTICAL_OFFSET_MIN} max={VERTICAL_OFFSET_MAX} onChange={this.onTopWaveVerticalOffsetChange} />
							<span>{this.state.topWaveProperties.verticalOffset}</span>
						</div>
					</div>
					<div className="ui-wave-parameters" style={{background: "rgb(128, 128, 255"}}>
						<strong>Bottom Wave (Blue)</strong>
						<div className="ui-form-element">
							<label>Vertices (2 to 25)</label>
							<input className="ui-slider" type="range" min="2" max="25" onChange={this.onBottomWaveVerticesChange} />
							<span>{this.state.bottomWave.numVertices}</span>
						</div>
						<div className="ui-form-element">
							<label>Vertical Offset</label>
							<input className="ui-slider" type="range" min={VERTICAL_OFFSET_MIN} max={VERTICAL_OFFSET_MAX} onChange={this.onBottomWaveVerticalOffsetChange} />
							<span>{this.state.bottomWaveProperties.verticalOffset}</span>
						</div>
					</div>
				</form>
				<CanvasArea width={1280} height={720} bgColor="#eeeeee"
					surfaceWave={this.state.surfaceWave} topWave={this.state.topWave} bottomWave={this.state.bottomWave}
					surfaceWaveOffsetY={this.state.surfaceWaveProperties.verticalOffset}
					topWaveOffsetY={this.state.topWaveProperties.verticalOffset}
					bottomWaveOffsetY={this.state.bottomWaveProperties.verticalOffset}
					generateRandomMap={this.generateRandomMap}
					verticesVisible={this.state.verticesVisible} waveSurfacesVisible={this.state.waveSurfacesVisible} />
				<div className="ui-controls">
					<strong>Controls</strong>
					<Button label="Generate New Map" onClick={this.generateRandomMap} />
					<Button label="Toggle surfaces" onClick={this.toggleWaveSurfaces} />
					<Button label="Toggle vertices" onClick={this.toggleVertices} />
					<select value={this.state.interpolationMethod} onChange={this.changeInterpolationMethod}>
						<option value={0}>Linear Interpolation</option>
						<option value={1}>Cosine Interpolation</option>
					</select>
					<Button label="Export Map Data" onClick={this.exportMapData} />
					<textarea className="ui-textbox" value={this.state.mapData} readOnly />
					<h3>How To Use In Game</h3>
					<p>Highlight and copy the text above. Then go back to the lobby and start the game.</p>
				</div>
			</div>
		);
	}
}

export default App;