//Maps n from [a1...a2] to [b1...b2]
export const mapRange = (a1, a2, b1, b2, n) => {
	return b1 + ((n - a1)*(b2 - b1))/(a2 - a1);
}