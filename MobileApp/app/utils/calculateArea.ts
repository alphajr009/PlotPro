interface Point {
    latitude: number;
    longitude: number;
  }
  
  // Calculate the area of the polygon using the shoelace formula
  export const calculateArea = (points: Point[]): number => {
    let area = 0;
    const n = points.length;
  
    for (let i = 0; i < n - 1; i++) {
      area += (points[i].latitude * points[i + 1].longitude) - (points[i].longitude * points[i + 1].latitude);
    }
    area += (points[n - 1].latitude * points[0].longitude) - (points[n - 1].longitude * points[0].latitude);
  
    return Math.abs(area) / 2;
  };
  