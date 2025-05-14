.button {
  background: linear-gradient(145deg, #ff2f8b, #e42072);
  color: white;
  padding: 14px;
  border-radius: 16px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 14px #ff2f8b55;
  transition: transform 0.3s ease;
  animation: pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.button:hover {
  transform: scale(1.1);
}