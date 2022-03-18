import axios from 'axios';

const gateway = "https://gateway.pinata.cloud/ipfs/";

export async function uploadImage(image: any, name: string) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("pinataMetadata", JSON.stringify({ name: name}));
    const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
            headers: {
                pinata_api_key: "64e4bd2bb506559ea8f5",
                pinata_secret_api_key: "58d4ec66cc8d52414f3cd35e1f050396ba673cc9c30b78cc97297ea0ebe5a2dd"
              }
        }
    )
    return res.data.IpfsHash;
}

export const Gateway = (url: string) => gateway + url;