import { mapRange } from "../utils";

const DEFAULT_NUM_VERTICES = 12;
const LINEAR_INTERPOLATION = 0;
const COSINE_INTERPOLATION = 1;

class MapWave {
	
	constructor(width, height, seed){
		this.waveWidth = width;
		this.waveHeight = height;
		this.seed = seed; //TODO unused
		this.numVertices = DEFAULT_NUM_VERTICES;
		this.plot = [];
		this.verticesList = [];
		this.interpolationMethod = COSINE_INTERPOLATION;
	}
	
	getPlot(){
		return this.plot;
	}
	
	setInterpolationMethod(n){
		this.interpolationMethod = n;
	}
	
	setNumVertices(amount){
		if(this.numVertices >= 2){
			this.numVertices = amount;
		}
		else{
			this.numVertices = DEFAULT_NUM_VERTICES;
		}
	}
	
	generateWave(){
		//First, plot the vertices
		this.generateVertices();
		
		//Next, interpolate between vertices from left to right
		this.interpolateVertices();
	}
	
	generateVertices(){
		this.verticesList = [];
		for(let i = 0; i <= this.numVertices; i++){
			let x = i * Math.floor(this.waveWidth / this.numVertices);
			if(i == this.numVertices){
				x = this.waveWidth - 1;
			}
			let y = Math.floor(Math.random() * this.waveHeight);//random.nextInt(waveHeight);
			this.plot[x] = y;
			this.verticesList[i] = {x: x, y: y};
		}
	}
	
	interpolateVertices(){
		for(let i = 0; i < this.numVertices; i++){
			let x1 = i * Math.floor(this.waveWidth / this.numVertices);
			let y1 = this.plot[x1];
			let x2 = (i + 1) * Math.floor(this.waveWidth / this.numVertices);
			if(i == this.numVertices - 1){
				x2 = this.waveWidth - 1;
			}
			let y2 = this.plot[x2];
			for(let x = x1 + 1; x <= x2; x++){
				if(this.interpolationMethod == COSINE_INTERPOLATION){
					this.plot[x] = Math.floor(this.cosineInterpolate(y1, y2, mapRange(x1, x2, 0, 1, x)));
				}
				else if(this.interpolationMethod == LINEAR_INTERPOLATION){
					this.plot[x] = Math.floor(this.linearInterpolate(y1, y2, mapRange(x1, x2, 0, 1, x)));
				}
				else{ //Default to cosine interpolation
					this.plot[x] = Math.floor(this.cosineInterpolate(y1, y2, mapRange(x1, x2, 0, 1, x)));
				}
			}
		}
	}
	
	setWaveHeight(h){
		if(h > 0){
			this.waveHeight = h;
		}
		else{
			this.waveHeight = 500;
		}
	}
	
	cosineInterpolate(y1, y2, mu){
		let mu2 = (1 - Math.cos(mu * Math.PI)) / 2;
		return y1*(1 - mu2) + y2*mu2;
	}
	
	linearInterpolate(y1, y2, mu){
		return(y1*(1-mu) + y2*mu);
	}
}

export default MapWave;
