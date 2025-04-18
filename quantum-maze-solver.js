import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

export default function MazeSolver() {
  const [running, setRunning] = useState(false);
  const [raceMode, setRaceMode] = useState(false);
  const [step, setStep] = useState(0);
  const size = 90;
  const [grid, setGrid] = useState([]);
  const [quantumPaths, setQuantumPaths] = useState([]);
  const [gatPath, setGatPath] = useState([]);
  const [gatIntersections, setGatIntersections] = useState([]);
  const [quantumFound, setQuantumFound] = useState(false);
  const [gatFound, setGatFound] = useState(false);
  const [winner, setWinner] = useState(null);

  // Existing generateMaze function remains the same
  const generateMaze = useCallback(() => {
    const maze = Array(size).fill().map(() => Array(size).fill(1));
    
    const getUnvisitedNeighbors = (x, y, visited) => {
      const neighbors = [];
      const directions = [[0, -2], [0, 2], [-2, 0], [2, 0]];
      
      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < size && newY >= 0 && newY < size && !visited[newY][newX]) {
          neighbors.push([newX, newY, (x + newX) / 2, (y + newY) / 2]);
        }
      }
      
      return neighbors.sort(() => Math.random() - 0.5);
    };
    
    const visited = Array(size).fill().map(() => Array(size).fill(false));
    const stack = [[1, 1]];
    visited[1][1] = true;
    maze[1][1] = 0;
    
    while (stack.length > 0) {
      const [x, y] = stack[stack.length - 1];
      const neighbors = getUnvisitedNeighbors(x, y, visited);
      
      if (neighbors.length === 0) {
        stack.pop();
      } else {
        const [nextX, nextY, wallX, wallY] = neighbors[0];
        visited[nextY][nextX] = true;
        maze[wallY][wallX] = 0;
        maze[nextY][nextX] = 0;
        stack.push([nextX, nextY]);
      }
    }
    
    maze[1][1] = 2;
    maze[size-2][size-2] = 3;
    
    for (let i = 0; i < Math.floor(size / 2); i++) {
      const x = 2 * Math.floor(Math.random() * ((size-1)/2)) + 1;
      const y = 2 * Math.floor(Math.random() * ((size-1)/2)) + 1;
      if (maze[y][x] === 1) maze[y][x] = 0;
    }
    
    return maze;
  }, []);

  const quantumStep = useCallback(() => {
    if (quantumFound) return;

    setQuantumPaths(prevPaths => {
      const newPaths = [];
      let foundEnd = false;

      prevPaths.forEach(path => {
        const lastPos = path[path.length - 1];
        const neighbors = [
          [lastPos[0]-1, lastPos[1]], 
          [lastPos[0]+1, lastPos[1]],
          [lastPos[0], lastPos[1]-1], 
          [lastPos[0], lastPos[1]+1]
        ];
        
        const validNeighbors = neighbors.filter(([ny, nx]) => 
          ny >= 0 && ny < size && nx >= 0 && nx < size && 
          grid[ny][nx] !== 1 &&
          !path.some(([py, px]) => py === ny && px === nx)
        );

        if (validNeighbors.length > 0) {
          if (validNeighbors.length > 1) {
            validNeighbors.forEach(nextPos => {
              if (grid[nextPos[0]][nextPos[1]] === 3) {
                foundEnd = true;
              }
              const newPath = [...path, nextPos];
              newPaths.push(newPath);
            });
          } else {
            const nextPos = validNeighbors[0];
            if (grid[nextPos[0]][nextPos[1]] === 3) {
              foundEnd = true;
            }
            newPaths.push([...path, nextPos]);
          }
        }
      });

      if (foundEnd) {
        setQuantumFound(true);
        if (!gatFound && !winner) setWinner('quantum');
      }

      const maxPaths = 150;
      const sortedPaths = newPaths.sort((a, b) => {
        const aLast = a[a.length - 1];
        const bLast = b[b.length - 1];
        const aDist = Math.abs(aLast[0] - (size-2)) + Math.abs(aLast[1] - (size-2));
        const bDist = Math.abs(bLast[0] - (size-2)) + Math.abs(bLast[1] - (size-2));
        return aDist - bDist;
      });
      return sortedPaths.slice(0, maxPaths);
    });
  }, [grid, quantumFound, gatFound, winner]);

  const gatStep = useCallback(() => {
    if (gatFound) return;
    
    const [currentY, currentX] = gatPath[gatPath.length - 1];
    
    if (grid[currentY][currentX] === 3) {
      setGatFound(true);
      if (!quantumFound && !winner) setWinner('gat');
      return;
    }
    
    const neighbors = [
      [currentY-1, currentX], [currentY+1, currentX],
      [currentY, currentX-1], [currentY, currentX+1]
    ];
    
    const validNeighbors = neighbors.filter(([ny, nx]) => 
      ny >= 0 && ny < size && nx >= 0 && nx < size && 
      grid[ny][nx] !== 1 && 
      !gatPath.some(([py, px]) => py === ny && px === nx)
    );
    
    if (validNeighbors.length > 1) {
      setGatIntersections(prev => [...prev, [currentY, currentX]]);
    }
    
    if (validNeighbors.length > 0) {
      validNeighbors.sort(([y1, x1], [y2, x2]) => {
        const d1 = Math.abs(y1 - (size-2)) + Math.abs(x1 - (size-2));
        const d2 = Math.abs(y2 - (size-2)) + Math.abs(x2 - (size-2));
        return d1 - d2;
      });
      
      const [nextY, nextX] = validNeighbors[0];
      setGatPath(prev => [...prev, [nextY, nextX]]);
      
      if (grid[nextY][nextX] === 3) {
        setGatFound(true);
        if (!quantumFound && !winner) setWinner('gat');
      }
    } else if (gatIntersections.length > 0) {
      const lastIntersection = gatIntersections[gatIntersections.length - 1];
      setGatPath(prev => [...prev, lastIntersection]);
      setGatIntersections(prev => prev.slice(0, -1));
    }
  }, [grid, gatPath, gatIntersections, gatFound, quantumFound, winner]);
  
  useEffect(() => {
    let interval;
    if (running && (!quantumFound || !gatFound)) {
      interval = setInterval(() => {
        setStep(s => s + 1);
        if (raceMode) {
          quantumStep();
          gatStep();
        } else {
          quantumStep();
        }
      }, 25);
    }
    return () => clearInterval(interval);
  }, [running, quantumStep, gatStep, raceMode, quantumFound, gatFound]);
  
  const reset = useCallback(() => {
    setRunning(false);
    setStep(0);
    setQuantumFound(false);
    setGatFound(false);
    setWinner(null);
    const newMaze = generateMaze();
    setGrid(newMaze);
    setGatPath([[1, 1]]);
    setGatIntersections([]);
    setQuantumPaths([[[1, 1]]]);
  }, [generateMaze]);

  useEffect(() => {
    reset();
  }, [reset]);

  const getCellColor = useCallback((i, j) => {
    const quantumPathCount = quantumPaths.filter(path => 
      path.some(([y, x]) => y === i && x === j)
    ).length;
    
    const isInGatPath = gatPath.some(([y, x]) => y === i && x === j);
    
    if (raceMode) {
      if (quantumPathCount > 0 && isInGatPath) {
        return 'rgb(147, 51, 234)'; // Purple for overlap
      } else if (quantumPathCount > 0) {
        return `rgb(0, ${Math.floor((quantumPathCount / quantumPaths.length) * 255)}, 255)`; // Blue
      } else if (isInGatPath) {
        return 'rgb(255, 165, 0)'; // Orange
      }
    } else {
      if (quantumPathCount > 0) {
        return `rgb(0, ${Math.floor((quantumPathCount / quantumPaths.length) * 255)}, 255)`;
      }
    }
    return undefined;
  }, [quantumPaths, gatPath, raceMode]);

  return (
    <Card className="w-full max-w-[95vw] h-[95vh]">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            {raceMode ? 'Quantum vs GAT Race' : 'Quantum Maze Solver'}
            {winner && ` - ${winner.toUpperCase()} Wins!`}
          </span>
          <Button
            variant="outline"
            onClick={() => {
              setRaceMode(prev => !prev);
              reset();
            }}
            className="flex items-center gap-2"
          >
            <Flag className="w-4 h-4" />
            {raceMode ? 'Single Mode' : 'Race Mode'}
          </Button>
        </CardTitle>
        <div className="text-sm text-gray-500">
          Step: {step} | Quantum Paths: {quantumPaths.length} | GAT Path Length: {gatPath.length}
        </div>
      </CardHeader>
      <CardContent className="h-[calc(95vh-120px)]">
        <div className="grid gap-4 h-full">
          <div 
            className="inline-grid" 
            style={{ 
              display: 'grid',
              gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
              gap: running ? '0px' : '1px',
              backgroundColor: running ? 'transparent' : 'rgb(229, 231, 235)',
              padding: running ? '0px' : '1px',
              borderRadius: '0.5rem',
              aspectRatio: '1 / 1',
              width: '100%',
              height: '100%',
              maxHeight: 'calc(95vh - 180px)'
            }}
          >
            {grid.map((row, i) => 
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`
                    aspect-square flex items-center justify-center text-[0.5rem]
                    ${cell === 1 ? 'bg-gray-800' : 
                      cell === 2 ? 'bg-green-500' : 
                      cell === 3 ? 'bg-red-500' : 
                      'bg-white'}
                  `}
                  style={{
                    backgroundColor: cell === 0 ? getCellColor(i, j) : undefined,
                    transition: 'background-color 0.1s ease-in-out'
                  }}
                >
                  {cell === 2 && 'S'}
                  {cell === 3 && 'E'}
                </div>
              ))
            )}
          </div>
          <div className="flex gap-2 justify-center">
            <Button 
              onClick={() => setRunning(!running)}
              className="flex items-center gap-2"
              disabled={quantumFound && gatFound}
            >
              {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {running ? 'Pause' : 'Start'}
            </Button>
            <Button
              onClick={reset}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Generate New Maze
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
