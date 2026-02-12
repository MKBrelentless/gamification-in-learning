# How to Add Cover Page Image

## Option 1: Download Free Image
1. Go to https://unsplash.com/s/photos/gamification or https://www.pexels.com/search/learning/
2. Download a free image you like
3. Save it as `cover.jpg` in `frontend/public/images/` folder
4. The image will work offline

## Option 2: Purchase Shutterstock Image
1. Purchase the image from Shutterstock
2. Download it
3. Save as `cover.jpg` in `frontend/public/images/` folder

## Option 3: Use Gradient Background (No image needed)
Already implemented in Login.jsx with CSS gradients

## To Use the Image:
In your Login.jsx or any page, add:
```jsx
<div 
  className="min-h-screen bg-cover bg-center"
  style={{ backgroundImage: "url('/images/cover.jpg')" }}
>
  {/* Your content */}
</div>
```

The image will be bundled with your app and work offline!
