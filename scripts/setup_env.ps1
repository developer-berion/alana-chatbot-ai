# setup_env.ps1
# Script to initialize GCP environment variables and enable APIs

$PROJECT_ID = "alana-chatbot-ai"
$REGION = "us-central1"

Write-Host "Setting up GCP Project: $PROJECT_ID in $REGION" -ForegroundColor Cyan

# 1. Check gcloud auth
Write-Host "Checking gcloud authentication..."
gcloud auth list

# 2. Set Project
Write-Host "Setting project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

# 3. Enable APIs
$APIS = @(
    "cloudfunctions.googleapis.com",
    "run.googleapis.com",
    "vertexai.googleapis.com",
    "discoveryengine.googleapis.com", 
    "secretmanager.googleapis.com",
    "cloudbuild.googleapis.com"
)

foreach ($api in $APIS) {
    Write-Host "Enabling API: $api ..."
    gcloud services enable $api
}

Write-Host "APIs enabled successfully." -ForegroundColor Green

# 4. Create Vertex AI Data Store (Docs placeholder)
Write-Host "Please create the Vertex AI Data Store manually in the console or via specific gcloud discoveryengine commands if available for your version." -ForegroundColor Yellow
Write-Host "Visit: https://console.cloud.google.com/gen-app-builder/engines"
