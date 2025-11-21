# Deploying to Netlify

Here are the steps to host your product page on Netlify.

## Option 1: Connect to GitHub (Recommended)

This is the easiest and most robust method. It sets up continuous deployment, so your site updates automatically when you push code.

1.  **Commit your changes:**
    Open your terminal and run:
    ```bash
    git add .
    git commit -m "Ready for deployment"
    ```

2.  **Push to GitHub:**
    *   Create a new repository on [GitHub](https://github.com/new).
    *   Follow the instructions to push your existing repository:
        ```bash
        git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
        git branch -M main
        git push -u origin main
        ```

3.  **Deploy on Netlify:**
    *   Log in to [Netlify](https://app.netlify.com/).
    *   Click **"Add new site"** > **"Import an existing project"**.
    *   Select **GitHub**.
    *   Choose your repository (`product-page`).
    *   Netlify will detect the Next.js settings automatically (thanks to the `netlify.toml` file I added).
    *   Click **"Deploy"**.

## Option 2: Netlify CLI (Manual)

If you don't want to use GitHub, you can deploy directly from your command line.

1.  **Install Netlify CLI:**
    ```bash
    npm install -g netlify-cli
    ```

2.  **Login:**
    ```bash
    netlify login
    ```

3.  **Deploy:**
    Run this command in your project folder:
    ```bash
    netlify deploy --prod
    ```
    *   **Build settings:** Press Enter to accept defaults.
    *   **Publish directory:** Ensure it is set to `.next` (or whatever the CLI suggests for Next.js).

## Option 3: Drag and Drop (Static Only)

*Note: This only works if we configure the app for static export, which might limit some Next.js features.*

1.  Update `next.config.ts` to include `output: 'export'`.
2.  Run `npm run build`.
3.  Drag the `out` folder to [Netlify Drop](https://app.netlify.com/drop).

**I recommend Option 1 for the best experience.**
