interface FieldData {
    userId: string;
    points: { latitude: number; longitude: number }[];
    area: number;
    perimeter: number;
  }
  
  export const saveFieldData = async (fieldData: FieldData): Promise<any> => {
    const API_BASE_URL = 'YOUR_API_BASE_URL'; // Replace with your actual API base URL
    
    const response = await fetch(`${API_BASE_URL}/fields/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fieldData),
    });
  
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to save field data');
    }
    
    return data;
  };
  