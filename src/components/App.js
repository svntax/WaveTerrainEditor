import React from "react";
import "./App.css";

import CanvasArea from "./CanvasArea";
import MapWave from "../terrain_gen/MapWave";
import Button from "./Button";

class App extends React.Component {
	constructor(props){
		super(props);
		
		let surfaceWave = new MapWave(1280, 300, 12345);
		surfaceWave.generateWave();
		surfaceWave.setOffsetY(48);
		
		let topWave = new MapWave(1280, 400, 12345);
		topWave.setNumVertices(18);
		topWave.generateWave();
		topWave.setOffsetY(90);
		
		let bottomWave = new MapWave(1280, 400, 12345);
		bottomWave.setNumVertices(22);
		bottomWave.generateWave();
		bottomWave.setOffsetY(60);
		
		this.state = {
			surfaceWave: surfaceWave,
			topWave: topWave,
			bottomWave: bottomWave,
			waveSurfacesVisible: false,
			verticesVisible: false,
			interpolationMethod: 1
		};
	}
	
	generateRandomMap = () => {
		let surfaceWave = new MapWave(1280, 300, 12345);
		let topWave = new MapWave(1280, 400, 12345);
		let bottomWave = new MapWave(1280, 400, 12345);
		
		surfaceWave.setInterpolationMethod(this.state.interpolationMethod);
		topWave.setInterpolationMethod(this.state.interpolationMethod);
		bottomWave.setInterpolationMethod(this.state.interpolationMethod);
		
		surfaceWave.generateWave();
		surfaceWave.setOffsetY(48);
		
		topWave.setNumVertices(14);
		topWave.generateWave();
		topWave.setOffsetY(90);
		
		bottomWave.setNumVertices(16);
		bottomWave.generateWave();
		bottomWave.setOffsetY(60);
		
		this.setState({
			surfaceWave: surfaceWave,
			topWave: topWave,
			bottomWave: bottomWave
		});
	}
	
	toggleWaveSurfaces = () => {
		this.setState({waveSurfacesVisible: !this.state.waveSurfacesVisible});
	}
	
	toggleVertices = () => {
		this.setState({verticesVisible: !this.state.verticesVisible});
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
				<select value={this.state.interpolationMethod} onChange={this.changeInterpolationMethod}>
					<option value={0}>Linear Interpolation</option>
					<option value={1}>Cosine Interpolation</option>
				</select>
				<CanvasArea width={1280} height={720} bgColor="#eeeeee"
					surfaceWave={this.state.surfaceWave} topWave={this.state.topWave} bottomWave={this.state.bottomWave}
					generateRandomMap={this.generateRandomMap}
					verticesVisible={this.state.verticesVisible} waveSurfacesVisible={this.state.waveSurfacesVisible} />
			</div>
		);
	}
}

export default App;