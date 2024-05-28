import CustomCard from "./Card";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useRouter } from 'next/router';
import CustomPrice from "./Price";
import CustomRating from './Rating';

export type Image = {
  image: string,
  id: string,
  description: string,
  title: string,
  price: number,
  rating?: number
}

export interface SearchResultCardProps {
  images: Image[],
  title: string
}

export default function SearchResultCard({ images, title }: SearchResultCardProps) {
  const router = useRouter();
  
  const handleProductRedirect = (id: string) => {
    router.push(`/product/${id}`);
  }

  return (
    <CustomCard 
      elevation={0} 
      sx={{ 
        width: "auto", 
        height: 'auto', 
        margin: 1, 
        maxHeight: '100%', 
        maxWidth: '300px', 
        display: 'flex', 
        flexDirection: 'column',
        flexGrow: 1,
        cursor: 'pointer'
      }}
      onClick={() => handleProductRedirect(images[0].id)} // Redirecting based on the first image's id
    >
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <Box
          component="img"
          src={images[0].image}
          sx={{ 
            width: '100%', 
            height: '200px', // Set the fixed height
            maxWidth: '300px', // Set the fixed width
            objectFit: 'contain' // Scale down larger images to fit within the dimensions
          }}
        />
      </Box>
      <Box sx={{ padding: 1, textAlign: 'center' }}>
        <Typography variant='subtitle1' sx={{ mb: 1 }}>
          {title.length > 29 ? `${title.slice(0, 28)}...` : title}
        </Typography>
        {images[0].rating !== undefined && (
          <Box sx={{ mb: 1 }}>
            <CustomRating rating={images[0].rating} size='small' />
          </Box>
        )}
        <CustomPrice value={images[0].price} />
      </Box>
    </CustomCard>
  )
}
