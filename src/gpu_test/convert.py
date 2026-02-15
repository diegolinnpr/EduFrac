import numpy as np

def convert(path):
	data = np.load(f"{path}.npz")
	points = data["points"]
	points = np.ascontiguousarray(data["points"], dtype=np.float32)
	points.tofile(path + ".bin")

if __name__ == "__main__":
	convert("/Users/tobiaswatters/Desktop/DSproj/point_data/cube")
	convert("/Users/tobiaswatters/Desktop/DSproj/point_data/dodecahedron")
	convert("/Users/tobiaswatters/Desktop/DSproj/point_data/icosahedron")
	convert("/Users/tobiaswatters/Desktop/DSproj/point_data/octohedron")
	convert("/Users/tobiaswatters/Desktop/DSproj/point_data/tetrahedron")