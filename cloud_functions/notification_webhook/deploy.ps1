# deploy.ps1
# Script to manually deploy the Notification Webhook Cloud Function
# FIXES: Enforces project ID and checks for package.json

$PROJECT_ID = "alana-chatbot-ai"
$FUNCTION_NAME = "notification-webhook"
$REGION = "us-central1"
$RUNTIME = "nodejs20"
$ENTRY_POINT = "sendNotification"

# 1. Ensure correct project is selected
Write-Host "Setting active project to: $PROJECT_ID" -ForegroundColor Cyan
gcloud config set project $PROJECT_ID

# 2. Enable necessary APIs (Idempotent - will skip if already enabled)
Write-Host "Ensuring APIs are enabled..." -ForegroundColor Yellow
$APIS = @(
    "cloudfunctions.googleapis.com", 
    "run.googleapis.com", 
    "artifactregistry.googleapis.com", 
    "cloudbuild.googleapis.com"
)
foreach ($api in $APIS) {
    gcloud services enable $api
}

# 3. Validation: Check for package.json
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: package.json not found in current directory!" -ForegroundColor Red
    Write-Host "Please run this script from the 'cloud_functions/notification_webhook' directory." -ForegroundColor Red
    Write-Host "Current location: $(Get-Location)"
    exit 1
}

# 4. Deploy
Write-Host "Deploying $FUNCTION_NAME to $REGION..." -ForegroundColor Cyan
gcloud functions deploy $FUNCTION_NAME `
    --project=$PROJECT_ID `
    --gen2 `
    --runtime=$RUNTIME `
    --region=$REGION `
    --source=. `
    --entry-point=$ENTRY_POINT `
    --trigger-http `
    --allow-unauthenticated

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deployment successful!" -ForegroundColor Green
}
else {
    Write-Host "Deployment failed. Check errors above." -ForegroundColor Red
}

Read-Host -Prompt "Press Enter to exit"
