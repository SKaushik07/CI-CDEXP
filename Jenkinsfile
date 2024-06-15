pipeline {
    agent any
    
    environment {
        // Define environment variables if needed
        DOCKER_HUB_CREDENTIALS = credentials('hixej84931fna6') // Jenkins credentials ID for Docker Hub
        KUBE_CONFIG = credentials('kube-config-id') // Jenkins credentials ID for Kubernetes config file
        IMAGE_TAG = "latest" // You can use a dynamic tag based on git commit hash, etc.
        APP_NAME = "nodejs_exp" 
    }
    
    stages {
        stage('Build') {
            steps {
                // Checkout your Node.js project code
                git 'https://github.com/SKaushik07/CI-CDEXP.git'
                
                // Install Node.js dependencies
                sh 'npm install'
            }
        }
        
        stage('Dockerize and Push to Docker Hub') {
            steps {
                // Build Docker image using Dockerfile in your project
                script {
                    docker.build("nodejs_exp:${IMAGE_TAG}")
                }
                
                // Authenticate with Docker Hub
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'DOCKER_HUB_CREDENTIALS', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD']]) {
                    docker.withRegistry('https://hub.docker.com/repository/docker/hixej84931fna6/nodejs_exp/general', 'hixej84931fna6') {
                        // Push the Docker image to Docker Hub
                        docker.image("nodejs_exp:${IMAGE_TAG}").push()
                    }
                }
            }
        }
        
        // stage('Deploy to Kubernetes') {
        //     steps {
        //         // Use Kubernetes plugin to deploy to Kubernetes cluster
        //         withCredentials([file(credentialsId: 'kube-config-id', variable: 'KUBECONFIG')]) {
        //             sh """
        //             export KUBECONFIG=$KUBECONFIG
        //             kubectl apply -f path/to/your/kubernetes/deployment.yaml --namespace default
        //             """
        //         }
        //     }
        // }
    }
}
