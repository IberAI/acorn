
import { NextApiRequest, NextApiResponse } from 'next';
// import utils here to make it easier

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // External service request
  const response = await fetch('https://api.external-service.com/data');
  const data = await response.json();

  // Process the data as needed
  const processedData = processData(data);

  res.status(200).json(processedData);
}

function processData(data: any) {
  // Perform your data processing here
  return data; // Modify this as needed
}
