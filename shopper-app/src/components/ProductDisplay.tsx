// source: https://mui.com/material-ui/react-image-list/

import React, { useState } from 'react';
import { Box, Card, CardMedia } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

interface ProductDisplayProps {
  images: string[]; // Array of image URLs
}

export default function ProductDisplay({ images }: ProductDisplayProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]); // Initially select the first image

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <Box aria-label="other-images" sx={{ display: 'flex', alignItems: 'center', mr: 1.5 }}>
      <Box sx={{ width: '15%', mr: 2 }}>
        <ImageList sx={{ width: '100%', maxWidth: '50', overflow: 'hidden' }} cols={1} gap={10}>
          {images.map((image) => (
            <ImageListItem
              key={image}
              sx={{
                borderRadius: '8px',
                border: image === selectedImage ? '4px solid #007185' : 'none',
                cursor: 'pointer',
              }}
            >
              <img
                src={image}
                alt={image}
                onClick={() => handleImageClick(image)}
                onMouseEnter={() => handleImageClick(image)}
                loading="lazy"
                style={{ cursor: 'pointer' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Box aria-label="selected-image" sx={{ flexGrow: 1, height: 500, display: 'flex' }}>
        <Card sx={{ maxWidth: 500, margin: 'auto' }}>
          <CardMedia component="img" image={selectedImage} alt="Selected Image" />
        </Card>
      </Box>
    </Box>
  );
}
