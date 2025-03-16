interface Point {
    latitude: number;
    longitude: number;
  }
  
  // Calculate the perimeter of the polygon by summing the distances between consecutive points
  export const calculatePerimeter = (points: Point[]): number => {
    let perimeter = 0;
  
    for (let i = 0; i < points.length - 1; i++) {
      const lat1 = points[i].latitude;
      const lon1 = points[i].longitude;
      const lat2 = points[i + 1].latitude;
      const lon2 = points[i + 1].longitude;
  
      // Calculate the distance between two points using the Pythagorean theorem
      const distance = Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
      perimeter += distance;
    }
  
    // Closing the polygon (distance between the last and the first point)
    const lat1 = points[points.length - 1].latitude;
    const lon1 = points[points.length - 1].longitude;
    const lat2 = points[0].latitude;
    const lon2 = points[0].longitude;
  
    const distance = Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
    perimeter += distance;
  
    return perimeter;
  };
  