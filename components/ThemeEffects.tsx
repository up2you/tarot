/**
 * 主題背景特效元件
 * 每個主題有獨特的動畫效果
 */

import React, { useEffect, useRef } from 'react';
import { ThemeId } from '../hooks/useTheme';

interface ThemeEffectsProps {
    theme: ThemeId;
}

const ThemeEffects: React.FC<ThemeEffectsProps> = ({ theme }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 設置畫布大小
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // 粒子類型
        interface Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            life: number;
            maxLife: number;
            color: string;
        }

        const particles: Particle[] = [];

        // 根據主題創建粒子
        const createParticle = (): Particle => {
            if (theme === 'baroque') {
                // 巴洛克：金色塵埃漂浮
                return {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: -Math.random() * 0.5 - 0.1,
                    opacity: Math.random() * 0.5 + 0.2,
                    life: 0,
                    maxLife: 200 + Math.random() * 200,
                    color: '#d4af37'
                };
            } else if (theme === 'cyberpunk') {
                // 賽博龐克：數位雨滴
                return {
                    x: Math.random() * canvas.width,
                    y: -10,
                    size: Math.random() * 2 + 1,
                    speedX: 0,
                    speedY: Math.random() * 3 + 2,
                    opacity: Math.random() * 0.8 + 0.2,
                    life: 0,
                    maxLife: 150,
                    color: Math.random() > 0.5 ? '#00fff9' : '#ff00ff'
                };
            } else {
                // 星空：流星 + 閃爍星辰
                const isStar = Math.random() > 0.02;
                if (isStar) {
                    return {
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        size: Math.random() * 2 + 0.5,
                        speedX: 0,
                        speedY: 0,
                        opacity: Math.random(),
                        life: Math.random() * 100,
                        maxLife: 100,
                        color: Math.random() > 0.3 ? '#a78bfa' : '#fbbf24'
                    };
                } else {
                    // 流星
                    return {
                        x: Math.random() * canvas.width,
                        y: 0,
                        size: 2,
                        speedX: Math.random() * 5 + 3,
                        speedY: Math.random() * 3 + 2,
                        opacity: 1,
                        life: 0,
                        maxLife: 60,
                        color: '#ffffff'
                    };
                }
            }
        };

        // 初始化粒子
        const particleCount = theme === 'celestial' ? 100 : 50;
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }

        // 動畫循環
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, index) => {
                // 更新位置
                p.x += p.speedX;
                p.y += p.speedY;
                p.life++;

                // 星空主題：閃爍效果
                if (theme === 'celestial' && p.speedX === 0 && p.speedY === 0) {
                    p.opacity = Math.abs(Math.sin(p.life * 0.05)) * 0.8 + 0.2;
                }

                // 繪製粒子
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity * (1 - p.life / p.maxLife);
                ctx.fill();

                // 流星拖尾
                if (theme === 'celestial' && p.speedX > 0) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x - p.speedX * 10, p.y - p.speedY * 10);
                    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                // 賽博龐克拖尾
                if (theme === 'cyberpunk') {
                    for (let i = 1; i <= 5; i++) {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y - i * 3, p.size * 0.8, 0, Math.PI * 2);
                        ctx.fillStyle = p.color;
                        ctx.globalAlpha = (p.opacity * 0.3) * (1 - i / 5);
                        ctx.fill();
                    }
                }

                ctx.globalAlpha = 1;

                // 重置粒子
                if (p.life >= p.maxLife || p.y > canvas.height || p.x > canvas.width) {
                    particles[index] = createParticle();
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
};

export default ThemeEffects;
