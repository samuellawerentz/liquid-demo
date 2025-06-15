import LiquidGlass from 'liquid-glass-react'
import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'

function App() {
  const [position, setPosition] = useState({ x: 500, y: -100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const dragRef = useRef<HTMLDivElement>(null)

  // LiquidGlass controls state
  const [text, setText] = useState('Are you building AI Agents?')
  const [backgroundUrl, setBackgroundUrl] = useState('https://cdn.prod.website-files.com/6565737286e587567248583f/67c5500c2f4e2380c64995c8_Plivo%20logo%20-%20black.avif')
  const [displacementScale, setDisplacementScale] = useState(64)
  const [blurAmount, setBlurAmount] = useState(0.1)
  const [saturation, setSaturation] = useState(130)
  const [aberrationIntensity, setAberrationIntensity] = useState(2)
  const [elasticity, setElasticity] = useState(0.35)
  const [cornerRadius, setCornerRadius] = useState(100)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className='main min-h-screen' onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div className='container mx-auto p-4'>
        <div className='grid grid-cols-1 lg:grid-cols-10 gap-6 h-full'>
          {/* Main Content Area - 70% */}
          <div 
            className='lg:col-span-7 relative min-h-[600px] overflow-hidden'
            style={{
              backgroundImage: `url(${backgroundUrl})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div 
              ref={dragRef}
              onMouseDown={handleMouseDown}
              style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                cursor: isDragging ? 'grabbing' : 'grab',
              borderRadius: `${cornerRadius}px`
              }}
            >
              <LiquidGlass
                displacementScale={displacementScale}
                blurAmount={blurAmount}
                saturation={saturation}
                aberrationIntensity={aberrationIntensity}
                elasticity={elasticity}
                cornerRadius={cornerRadius}
                style={{
                  borderRadius: `${cornerRadius}px`
                }}
              >
                <div style={{userSelect: 'none', fontSize: '20px', color: 'black', fontWeight: 'bold', padding: '12px'}}>
                  {text}
                </div>
              </LiquidGlass>
            </div>
          </div>

          {/* Controls Panel - 30% */}
          <div className='lg:col-span-3 space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Controls</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                {/* Text Input */}
                <div className='space-y-2'>
                  <Label htmlFor="text">Text</Label>
                  <Input
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text..."
                  />
                </div>

                {/* Background Image URL */}
                <div className='space-y-2'>
                  <Label htmlFor="backgroundUrl">Background Image URL</Label>
                  <Input
                    id="backgroundUrl"
                    value={backgroundUrl}
                    onChange={(e) => setBackgroundUrl(e.target.value)}
                    placeholder="Enter image URL..."
                  />
                </div>

                {/* Displacement Scale */}
                <div className='space-y-2'>
                  <Label htmlFor="displacement">Displacement Scale: {displacementScale}</Label>
                  <Slider
                    id="displacement"
                    min={0}
                    max={200}
                    step={1}
                    value={[displacementScale]}
                    onValueChange={(value) => setDisplacementScale(value[0])}
                  />
                </div>

                {/* Blur Amount */}
                <div className='space-y-2'>
                  <Label htmlFor="blur">Blur Amount: {blurAmount.toFixed(2)}</Label>
                  <Slider
                    id="blur"
                    min={0}
                    max={1}
                    step={0.01}
                    value={[blurAmount]}
                    onValueChange={(value) => setBlurAmount(value[0])}
                  />
                </div>

                {/* Saturation */}
                <div className='space-y-2'>
                  <Label htmlFor="saturation">Saturation: {saturation}</Label>
                  <Slider
                    id="saturation"
                    min={0}
                    max={300}
                    step={1}
                    value={[saturation]}
                    onValueChange={(value) => setSaturation(value[0])}
                  />
                </div>

                {/* Aberration Intensity */}
                <div className='space-y-2'>
                  <Label htmlFor="aberration">Aberration Intensity: {aberrationIntensity}</Label>
                  <Slider
                    id="aberration"
                    min={0}
                    max={10}
                    step={0.1}
                    value={[aberrationIntensity]}
                    onValueChange={(value) => setAberrationIntensity(value[0])}
                  />
                </div>

                {/* Elasticity */}
                <div className='space-y-2'>
                  <Label htmlFor="elasticity">Elasticity: {elasticity.toFixed(2)}</Label>
                  <Slider
                    id="elasticity"
                    min={0}
                    max={1}
                    step={0.01}
                    value={[elasticity]}
                    onValueChange={(value) => setElasticity(value[0])}
                  />
                </div>

                {/* Corner Radius */}
                <div className='space-y-2'>
                  <Label htmlFor="radius">Corner Radius: {cornerRadius}</Label>
                  <Slider
                    id="radius"
                    min={0}
                    max={200}
                    step={1}
                    value={[cornerRadius]}
                    onValueChange={(value) => setCornerRadius(value[0])}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
