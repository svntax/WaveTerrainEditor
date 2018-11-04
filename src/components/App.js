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
			}
		};
	}
	
	generateRandomMap = () => {
		let surfaceWave = new MapWave(1280, 300, 12345);
		let topWave = new MapWave(1280, 400, 12345);
		let bottomWave = new MapWave(1280, 400, 12345);
		
		surfaceWave.setInterpolationMethod(this.state.interpolationMethod);
		topWave.setInterpolationMethod(this.state.interpolationMethod);
		bottomWave.setInterpolationMethod(this.state.interpolationMethod);
		
		surfaceWave.setNumVertices(this.state.surfaceWaveProperties.numVertices);
		//surfaceWave.setOffsetY(this.state.surfaceWaveProperties.verticalOffset);
		
		topWave.setNumVertices(this.state.topWaveProperties.numVertices);
		//topWave.setOffsetY(this.state.topWaveProperties.verticalOffset);
		
		bottomWave.setNumVertices(this.state.bottomWaveProperties.numVertices);
		//bottomWave.setOffsetY(this.state.bottomWaveProperties.verticalOffset);
		
		surfaceWave.generateWave();
		topWave.generateWave();
		bottomWave.generateWave();
		
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
		//TODO should just regenerate using the same seed but different interpolation method
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
				<h1>Map Editor</h1>
				<p>Description</p>
				<Button label="Generate New Map" onClick={this.generateRandomMap} />
				<Button label="Toggle surfaces" onClick={this.toggleWaveSurfaces} />
				<Button label="Toggle vertices" onClick={this.toggleVertices} />
				<form className="ui-form" onSubmit={this.handleSubmit}>
					<select value={this.state.interpolationMethod} onChange={this.changeInterpolationMethod}>
						<option value={0}>Linear Interpolation</option>
						<option value={1}>Cosine Interpolation</option>
					</select>
					<div className="ui-wave-parameters" style={{background: "rgb(255, 128, 128)"}}>
						<strong>Surface Wave (Red)</strong>
						<div className="ui-form-element">
							<label>Vertices (2 to 25)</label>
							<input className="ui-slider" type="range" min="2" max="25" onChange={this.onSurfaceWaveVerticesChange} />
							<span>{this.state.surfaceWave.numVertices}</span>
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
			</div>
		);
	}
}

export default App;