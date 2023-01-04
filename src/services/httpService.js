import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: 'http://localhost:3001',
  baseURL: 'https://flashcards-node.glitch.me/',
  timeout: 10000,
  }
);

export async function get(url){
  const { data } = await axiosInstance.get(url);
  return data;
}

export async function create(url, object){
  const { data } = await axiosInstance.post(url, object);

  return data;
}

export async function remove(url){
  const { data } = await axiosInstance.delete(url);
  return data;
}

export async function edit(url, object){
  const { data } = await axiosInstance.put(url, object);
  return data;
}