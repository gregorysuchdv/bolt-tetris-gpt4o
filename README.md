# Cyberpunk Tetris Game

    Welcome to the Cyberpunk Tetris Game! This project is a modern take on the classic Tetris game, styled with a cyberpunk theme using Tailwind CSS. The game is built using modular JavaScript for better organization and maintainability.

    ## Features

    - **Cyberpunk Theme**: Styled with Tailwind CSS for a futuristic look.
    - **Modular Codebase**: Organized into separate modules for grid, pieces, and game logic.
    - **Interactive Gameplay**: Use arrow keys to move and rotate pieces.
    - **Automatic Piece Dropping**: Pieces drop automatically over time.
    - **Line Clearing**: Completed lines are cleared from the grid.

    ## Getting Started

    Follow these instructions to get a copy of the project up and running on your local machine.

    ### Prerequisites

    - Node.js and npm installed on your machine.

    ### Installation

    1. **Clone the repository**:
       ```bash
       git clone <repository-url>
       cd tetris-cyberpunk
       ```

    2. **Install dependencies**:
       ```bash
       npm install
       ```

    3. **Start the development server**:
       ```bash
       npm run dev
       ```

    4. **Open the game**:
       Open your browser and navigate to `http://localhost:5173` to play the game.

    ## Usage

    - **Arrow Keys**:
      - Left Arrow: Move piece left
      - Right Arrow: Move piece right
      - Down Arrow: Drop piece faster
      - Up Arrow: Rotate piece

    ## Project Structure

    - `src/`
      - `grid.js`: Handles grid creation, drawing, and line clearing.
      - `pieces.js`: Defines Tetris pieces and their rotations.
      - `gameLogic.js`: Manages piece movement, rotation, and collision detection.
      - `main.js`: Initializes the game and handles user input.
      - `style.css`: Tailwind CSS styles.

    - `index.html`: Main HTML file.

    ## Customization

    - **Add New Pieces**: Modify `pieces.js` to add new Tetris pieces.
    - **Change Styles**: Update `style.css` or `tailwind.config.js` for different themes.

    ## Contributing

    Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

    ## License

    This project is licensed under the MIT License.

    ## Acknowledgments

    - Inspired by the classic Tetris game.
    - Styled with Tailwind CSS for a modern look.

    Enjoy the game and happy coding!
